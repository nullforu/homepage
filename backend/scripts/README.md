# Announcement Management Scripts

Shell scripts for managing announcements in DynamoDB.

## Prerequisites

- AWS CLI installed and configured
- jq: `brew install jq` (macOS) or `apt-get install jq` (Ubuntu)
- DynamoDB read/write permissions
- Terraform infrastructure deployed

## Usage

### Create Announcement

```bash
./create-announcement.sh [news|notice] "title" "description" "content"
```

Example:

```bash
./create-announcement.sh news "New Recruitment" "Spring 2024 recruitment" "Details..."
```

For multi-line content, use heredoc:

```bash
CONTENT=$(cat <<'EOF'
# Recruitment Notice

We are looking for new members!

## Requirements
- Interest in security
- Basic programming skills

## How to Apply
Contact us at null4u@example.com
EOF
)

./create-announcement.sh news "New Recruitment" "Spring 2024 recruitment" "$CONTENT"
```

### Update Announcement

```bash
./update-announcement.sh [UUID] [field] "value"
```

Fields: `title`, `description`, `content`, `type`

Example:

```bash
./update-announcement.sh 550e8400-e29b-41d4-a716-446655440000 title "Updated Title"
```

### Delete Announcement

```bash
./delete-announcement.sh [UUID]
```

Requires `yes` confirmation before deletion.

### List Announcements

```bash
./list-announcements.sh [news|notice|all]
```

Example:

```bash
./list-announcements.sh all      # All
./list-announcements.sh news     # News only
./list-announcements.sh notice   # Notices only
```

### Get Announcement

```bash
./get-announcement.sh [UUID]
```

## DynamoDB Schema

```json
{
  "pk": "ANNOUNCEMENT#<uuid>",
  "sk": "META",
  "announcementId": "<uuid>",
  "type": "news" | "notice",
  "title": "title",
  "description": "short description",
  "content": "full content",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "views": 0,
  "gsi1pk": "ANNOUNCEMENTS",
  "gsi1sk": "<createdAt>#<uuid>"
}
```

## Notes

- Scripts automatically get table name from Terraform output
- All announcements are identified by UUID
- Backup important data before deletion
