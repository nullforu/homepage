'use strict'

const { ddb, GetCommand, UpdateCommand } = require('../lib/ddb')
const { json, badRequest, notFound, serverError } = require('../lib/http')

const TABLE_NAME = process.env.TABLE_NAME

exports.handler = async (event) => {
    try {
        if (event?.requestContext?.http?.method === 'OPTIONS') return json({ ok: true }, 200)

        const id = event.pathParameters?.id
        if (!id) return badRequest('Missing announcement id')

        const key = { pk: `ANNOUNCEMENT#${id}`, sk: 'META' }

        const updateResp = await ddb.send(
            new UpdateCommand({
                TableName: TABLE_NAME,
                Key: key,
                UpdateExpression: 'SET #views = if_not_exists(#views, :zero) + :inc, #updatedAt = :now',
                ExpressionAttributeNames: {
                    '#views': 'views',
                    '#updatedAt': 'updatedAt',
                },
                ExpressionAttributeValues: {
                    ':zero': 0,
                    ':inc': 1,
                    ':now': new Date().toISOString(),
                },
                ReturnValues: 'ALL_NEW',
            }),
        )

        if (!updateResp.Attributes) return notFound('Announcement not found')

        const it = updateResp.Attributes
        return json({
            ok: true,
            item: {
                id: it.announcementId,
                type: it.type,
                title: it.title,
                content: it.content,
                description: it.description,
                createdAt: it.createdAt,
                updatedAt: it.updatedAt,
                views: it.views || 0,
            },
        })
    } catch (err) {
        console.error(err)
        return serverError()
    }
}
