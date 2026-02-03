'use strict'

const { ddb, QueryCommand, GetCommand } = require('../lib/ddb')
const { json, badRequest, serverError } = require('../lib/http')
const { isUuid } = require('../lib/util')

const TABLE_NAME = process.env.TABLE_NAME
const GSI1_NAME = process.env.GSI1_NAME || 'gsi1'

exports.handler = async (event) => {
    try {
        if (event?.requestContext?.http?.method === 'OPTIONS') return json({ ok: true }, 200)

        const qs = event.queryStringParameters || {}
        const type = (qs.type || '').trim().toLowerCase()
        const limit = Math.min(Math.max(parseInt(qs.limit || '20', 10) || 20, 1), 100)
        const nextToken = (qs.nextToken || '').trim()

        let lastSortKey = null
        if (nextToken) {
            if (!isUuid(nextToken)) return badRequest('nextToken must be a UUID')
            const key = { pk: `ANNOUNCEMENT#${nextToken}`, sk: 'META' }
            const existing = await ddb.send(new GetCommand({ TableName: TABLE_NAME, Key: key }))
            if (!existing.Item) return badRequest('Invalid nextToken')
            lastSortKey = existing.Item.gsi1sk || `${existing.Item.createdAt}#${existing.Item.announcementId}`
        }

        const queryParams = {
            TableName: TABLE_NAME,
            IndexName: GSI1_NAME,
            KeyConditionExpression: lastSortKey ? 'gsi1pk = :pk AND gsi1sk < :last' : 'gsi1pk = :pk',
            ExpressionAttributeValues: lastSortKey
                ? { ':pk': 'ANNOUNCEMENTS', ':last': lastSortKey }
                : { ':pk': 'ANNOUNCEMENTS' },
            ScanIndexForward: false,
            Limit: limit,
        }

        if (type && (type === 'news' || type === 'notice')) {
            queryParams.FilterExpression = '#type = :type'
            queryParams.ExpressionAttributeNames = { '#type': 'type' }
            queryParams.ExpressionAttributeValues[':type'] = type
        }

        const allItems = []
        let lastEvaluatedKey = null
        let iterations = 0
        const maxIterations = 10

        while (allItems.length < limit && iterations < maxIterations) {
            if (lastEvaluatedKey) {
                queryParams.ExclusiveStartKey = lastEvaluatedKey
            }

            const resp = await ddb.send(new QueryCommand(queryParams))

            if (resp.Items && resp.Items.length > 0) {
                allItems.push(...resp.Items)
            }

            lastEvaluatedKey = resp.LastEvaluatedKey
            iterations++

            if (!lastEvaluatedKey) break

            if (allItems.length >= limit) break
        }

        const items = allItems.slice(0, limit).map((x) => ({
            id: x.announcementId,
            type: x.type,
            title: x.title,
            description: x.description,
            createdAt: x.createdAt,
            updatedAt: x.updatedAt,
            views: x.views || 0,
        }))

        const lastItem = allItems.length > 0 ? allItems[Math.min(limit, allItems.length) - 1] : null
        return json({
            ok: true,
            items,
            nextToken: lastEvaluatedKey && lastItem ? lastItem.announcementId : null,
        })
    } catch (err) {
        console.error(err)
        return serverError()
    }
}
