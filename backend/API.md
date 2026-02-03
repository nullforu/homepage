# Null4U API

Base URL: use the `api_base_url` output from Terraform.

## Announcements

> Read-only API for news and notices. Content is managed by admins through DynamoDB directly.

### GET /announcements

List announcements (newest first). Use `nextToken` as the last announcement UUID from the previous response.

Query params:

- `type` (optional: "news" or "notice" - filter by type)
- `limit` (1-100, default 20)
- `nextToken` (optional UUID)

Response:

```json
{
    "ok": true,
    "items": [
        {
            "id": "uuid",
            "type": "news",
            "title": "Title",
            "description": "Short description",
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z",
            "views": 42
        }
    ],
    "nextToken": "uuid-or-null"
}
```

### GET /announcements/{id}

Get a single announcement. Increments view count.

Response:

```json
{
    "ok": true,
    "item": {
        "id": "uuid",
        "type": "notice",
        "title": "Title",
        "content": "Full content",
        "description": "Short description",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z",
        "views": 43
    }
}
```

## Board (자유게시판)

> Anonymous board with password-protected CRUD operations.

### GET /board

List board posts (newest first). Use `nextToken` as the last post UUID from the previous response.

Query params:

- `limit` (1-100, default 20)
- `nextToken` (optional UUID)

Response:

```json
{
    "ok": true,
    "items": [
        {
            "id": "uuid",
            "title": "Title",
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z",
            "anonymousName": "Guest",
            "views": 15
        }
    ],
    "nextToken": "uuid-or-null"
}
```

### GET /board/{id}

Get a single board post. Increments view count.

Response:

```json
{
    "ok": true,
    "item": {
        "id": "uuid",
        "title": "Title",
        "content": "Body",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z",
        "anonymousName": "Guest",
        "views": 16
    }
}
```

### POST /board

Create an anonymous board post (password required for edit/delete later).

Request:

```json
{
    "title": "Title",
    "content": "Body",
    "anonymousName": "Guest",
    "password": "secret123"
}
```

Response:

```json
{
    "ok": true,
    "id": "uuid",
    "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### PUT /board/{id}

Update a board post (password required).

Request:

```json
{
    "title": "New title",
    "content": "New body",
    "anonymousName": "Guest",
    "password": "secret123"
}
```

Response:

```json
{
    "ok": true,
    "id": "uuid",
    "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### DELETE /board/{id}

Delete a board post (password required).

Request:

```json
{
    "password": "secret123"
}
```

Response:

```json
{
    "ok": true,
    "id": "uuid"
}
```
