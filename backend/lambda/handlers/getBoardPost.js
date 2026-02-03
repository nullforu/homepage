'use strict'

const { ddb, GetCommand, UpdateCommand } = require('../lib/ddb')
const { json, badRequest, notFound, serverError } = require('../lib/http')

const TABLE_NAME = process.env.TABLE_NAME

exports.handler = async (event) => {
    try {
        if (event?.requestContext?.http?.method === 'OPTIONS') return json({ ok: true }, 200)

        const id = event.pathParameters?.id
        if (!id) return badRequest('Missing board post id')

        const key = { pk: `BOARD#${id}`, sk: 'META' }

        const updateResp = await ddb.send(
            new UpdateCommand({
                TableName: TABLE_NAME,
                Key: key,
                UpdateExpression: 'SET #views = if_not_exists(#views, :zero) + :inc',
                ExpressionAttributeNames: {
                    '#views': 'views',
                },
                ExpressionAttributeValues: {
                    ':zero': 0,
                    ':inc': 1,
                },
                ReturnValues: 'ALL_NEW',
            }),
        )

        if (!updateResp.Attributes) return notFound('Board post not found')

        const it = updateResp.Attributes
        return json({
            ok: true,
            item: {
                id: it.boardId,
                title: it.title,
                content: it.content,
                createdAt: it.createdAt,
                updatedAt: it.updatedAt,
                anonymousName: it.anonymousName,
                views: it.views || 0,
            },
        })
    } catch (err) {
        console.error(err)
        return serverError()
    }
}
