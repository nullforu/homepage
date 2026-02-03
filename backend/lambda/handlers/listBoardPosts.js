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
        const limit = Math.min(Math.max(parseInt(qs.limit || '20', 10) || 20, 1), 100)
        const nextToken = (qs.nextToken || '').trim()

        let lastSortKey = null
        if (nextToken) {
            if (!isUuid(nextToken)) return badRequest('nextToken must be a UUID')
            const key = { pk: `BOARD#${nextToken}`, sk: 'META' }
            const existing = await ddb.send(new GetCommand({ TableName: TABLE_NAME, Key: key }))
            if (!existing.Item) return badRequest('Invalid nextToken')
            lastSortKey = existing.Item.gsi1sk || `${existing.Item.createdAt}#${existing.Item.boardId}`
        }

        const queryParams = {
            TableName: TABLE_NAME,
            IndexName: GSI1_NAME,
            KeyConditionExpression: lastSortKey ? 'gsi1pk = :pk AND gsi1sk < :last' : 'gsi1pk = :pk',
            ExpressionAttributeValues: lastSortKey ? { ':pk': 'BOARDS', ':last': lastSortKey } : { ':pk': 'BOARDS' },
            ScanIndexForward: false,
            Limit: limit,
        }

        const resp = await ddb.send(new QueryCommand(queryParams))

        const items = (resp.Items || []).map((x) => ({
            id: x.boardId,
            title: x.title,
            createdAt: x.createdAt,
            updatedAt: x.updatedAt,
            anonymousName: x.anonymousName,
            views: x.views || 0,
        }))

        const lastItem = resp.Items && resp.Items.length ? resp.Items[resp.Items.length - 1] : null
        return json({
            ok: true,
            items,
            nextToken: resp.LastEvaluatedKey && lastItem ? lastItem.boardId : null,
        })
    } catch (err) {
        console.error(err)
        return serverError()
    }
}
