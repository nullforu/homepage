#!/bin/bash

# List announcements script
# Usage: ./list-announcements.sh [news|notice|all]

set -e

TYPE=${1:-all}

if [ "$TYPE" != "news" ] && [ "$TYPE" != "notice" ] && [ "$TYPE" != "all" ]; then
    echo "Error: Type must be 'news', 'notice', or 'all'"
    exit 1
fi

TABLE_NAME=$(cd ../terraform && terraform output -raw dynamodb_table_name 2>/dev/null)
if [ -z "$TABLE_NAME" ]; then
    echo "Warning: Could not get table name from Terraform output"
    read -p "Enter DynamoDB table name: " TABLE_NAME
fi

if [ "$TYPE" = "all" ]; then
    RESULT=$(aws dynamodb query \
        --table-name "$TABLE_NAME" \
        --index-name "gsi1" \
        --key-condition-expression "gsi1pk = :pk" \
        --expression-attribute-values '{":pk": {"S": "ANNOUNCEMENTS"}}' \
        --scan-index-forward false \
        --output json)
else
    RESULT=$(aws dynamodb query \
        --table-name "$TABLE_NAME" \
        --index-name "gsi1" \
        --key-condition-expression "gsi1pk = :pk" \
        --filter-expression "#type = :type" \
        --expression-attribute-names '{"#type": "type"}' \
        --expression-attribute-values "{\":pk\": {\"S\": \"ANNOUNCEMENTS\"}, \":type\": {\"S\": \"$TYPE\"}}" \
        --scan-index-forward false \
        --output json)
fi

COUNT=$(echo "$RESULT" | jq '.Items | length')
echo "Found $COUNT items (type: $TYPE)"
echo ""

if [ "$COUNT" -gt 0 ]; then
    echo "$RESULT" | jq -r '.Items[] | 
        "ID:     \(.announcementId.S)\n" +
        "Type:   \(.type.S)\n" +
        "Title:  \(.title.S)\n" +
        "Views:  \(.views.N)\n" +
        "Date:   \(.createdAt.S)\n"'
else
    echo "No items found"
fi
