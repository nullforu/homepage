#!/bin/bash

# Delete announcement script
# Usage: ./delete-announcement.sh [UUID]

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

echo "Deleting announcement: $UUID"

read -p "Are you sure? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "Cancelled"
    exit 0
fi

aws dynamodb delete-item \
    --table-name "$TABLE_NAME" \
    --key "{\"pk\": {\"S\": \"ANNOUNCEMENT#$UUID\"}, \"sk\": {\"S\": \"META\"}}" \
    --return-values ALL_OLD > /dev/null

if [ $? -eq 0 ]; then
    echo "Deleted successfully"
else
    echo "Failed to delete"
    exit 1
fi
