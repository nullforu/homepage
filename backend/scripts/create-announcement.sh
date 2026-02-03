#!/bin/bash

# Create announcement script
# Usage: ./create-announcement.sh [news|notice] "title" "description" "content"

set -e

if [ "$#" -ne 4 ]; then
    echo "Error: Invalid number of arguments"
    echo "Usage: $0 [news|notice] \"title\" \"description\" \"content\""
    echo "Example: $0 news \"New Recruitment\" \"Spring 2024 recruitment\" \"Details...\""
    exit 1
fi

TYPE=$1
TITLE=$2
DESCRIPTION=$3
CONTENT=$4

if [ "$TYPE" != "news" ] && [ "$TYPE" != "notice" ]; then
    echo "Error: Type must be 'news' or 'notice'"
    exit 1
fi

if command -v uuidgen &> /dev/null; then
    UUID=$(uuidgen | tr '[:upper:]' '[:lower:]')
else
    UUID=$(cat /proc/sys/kernel/random/uuid)
fi

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")

TABLE_NAME=$(cd ../terraform && terraform output -raw dynamodb_table_name 2>/dev/null)
if [ -z "$TABLE_NAME" ]; then
    echo "Warning: Could not get table name from Terraform output"
    read -p "Enter DynamoDB table name: " TABLE_NAME
fi

echo "Creating announcement..."
echo "ID: $UUID"

# Escape JSON strings using jq
TITLE_JSON=$(echo -n "$TITLE" | jq -Rs .)
DESCRIPTION_JSON=$(echo -n "$DESCRIPTION" | jq -Rs .)
CONTENT_JSON=$(echo -n "$CONTENT" | jq -Rs .)

aws dynamodb put-item \
    --table-name "$TABLE_NAME" \
    --item "{
        \"pk\": {\"S\": \"ANNOUNCEMENT#$UUID\"},
        \"sk\": {\"S\": \"META\"},
        \"announcementId\": {\"S\": \"$UUID\"},
        \"type\": {\"S\": \"$TYPE\"},
        \"title\": {\"S\": $TITLE_JSON},
        \"description\": {\"S\": $DESCRIPTION_JSON},
        \"content\": {\"S\": $CONTENT_JSON},
        \"createdAt\": {\"S\": \"$TIMESTAMP\"},
        \"updatedAt\": {\"S\": \"$TIMESTAMP\"},
        \"views\": {\"N\": \"0\"},
        \"gsi1pk\": {\"S\": \"ANNOUNCEMENTS\"},
        \"gsi1sk\": {\"S\": \"$TIMESTAMP#$UUID\"}
    }" \
    --return-consumed-capacity TOTAL > /dev/null

if [ $? -eq 0 ]; then
    echo "Created successfully"
    echo "ID: $UUID"
else
    echo "Failed to create"
    exit 1
fi
