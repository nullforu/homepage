#!/bin/bash

# Get announcement script
# Usage: ./get-announcement.sh [UUID]

set -e

if [ "$#" -ne 1 ]; then
    echo "Error: Invalid number of arguments"
    echo "Usage: $0 [UUID]"
    echo "Example: $0 550e8400-e29b-41d4-a716-446655440000"
    exit 1
fi

UUID=$1

TABLE_NAME=$(cd ../terraform && terraform output -raw dynamodb_table_name 2>/dev/null)
if [ -z "$TABLE_NAME" ]; then
    echo "Warning: Could not get table name from Terraform output"
    read -p "Enter DynamoDB table name: " TABLE_NAME
fi

RESULT=$(aws dynamodb get-item \
    --table-name "$TABLE_NAME" \
    --key "{\"pk\": {\"S\": \"ANNOUNCEMENT#$UUID\"}, \"sk\": {\"S\": \"META\"}}" \
    --output json)

if [ "$(echo "$RESULT" | jq -r '.Item')" = "null" ]; then
    echo "Error: Announcement not found"
    exit 1
fi

echo "$RESULT" | jq -r '.Item | 
    "ID:     \(.announcementId.S)\n" +
    "Type:   \(.type.S)\n" +
    "Title:  \(.title.S)\n" +
    "Desc:   \(.description.S)\n" +
    "Views:  \(.views.N)\n" +
    "Date:   \(.createdAt.S)\n" +
    "\nContent:\n\(.content.S)"'
