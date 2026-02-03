#!/bin/bash

# Update announcement script
# Usage: ./update-announcement.sh [UUID] [field] "value"
# Fields: title, description, content, type

set -e

if [ "$#" -lt 3 ]; then
    echo "Error: Invalid number of arguments"
    echo "Usage: $0 [UUID] [field] \"value\""
    echo "Fields: title, description, content, type"
    echo "Example: $0 550e8400-e29b-41d4-a716-446655440000 title \"Updated Title\""
    exit 1
fi

UUID=$1
FIELD=$2
VALUE=$3

VALID_FIELDS=("title" "description" "content" "type")
if [[ ! " ${VALID_FIELDS[@]} " =~ " ${FIELD} " ]]; then
    echo "Error: Invalid field"
    echo "Valid fields: ${VALID_FIELDS[*]}"
    exit 1
fi

if [ "$FIELD" = "type" ]; then
    if [ "$VALUE" != "news" ] && [ "$VALUE" != "notice" ]; then
        echo "Error: Type must be 'news' or 'notice'"
        exit 1
    fi
fi

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")

TABLE_NAME=$(cd ../terraform && terraform output -raw dynamodb_table_name 2>/dev/null)
if [ -z "$TABLE_NAME" ]; then
    echo "Warning: Could not get table name from Terraform output"
    read -p "Enter DynamoDB table name: " TABLE_NAME
fi

echo "Updating announcement $UUID..."

# Escape JSON string using jq
VALUE_JSON=$(echo -n "$VALUE" | jq -Rs .)

# DynamoDB 아이템 수정
aws dynamodb update-item \
    --table-name "$TABLE_NAME" \
    --key "{\"pk\": {\"S\": \"ANNOUNCEMENT#$UUID\"}, \"sk\": {\"S\": \"META\"}}" \
    --update-expression "SET #field = :val, updatedAt = :time" \
    --expression-attribute-names "{\"#field\": \"$FIELD\"}" \
    --expression-attribute-values "{\":val\": {\"S\": $VALUE_JSON}, \":time\": {\"S\": \"$TIMESTAMP\"}}" \
    --return-values ALL_NEW > /dev/null

if [ $? -eq 0 ]; then
    echo "Updated successfully"
else
    echo "Failed to update"
    exit 1
fi
