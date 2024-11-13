#!/bin/bash

API_KEY="your-development-api-key"
BASE_URL="http://localhost:3000"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "Testing API endpoints..."

# Test health endpoint
echo -e "\n${GREEN}Testing health endpoint${NC}"
curl -s -H "x-api-key: $API_KEY" $BASE_URL/api/health | jq

# Create API key
echo -e "\n${GREEN}Creating new API key${NC}"
RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{"name":"Test Key"}' \
  $BASE_URL/api/v1/keys)
echo $RESPONSE | jq
NEW_KEY=$(echo $RESPONSE | jq -r '.key')

# List API keys
echo -e "\n${GREEN}Listing API keys${NC}"
curl -s -H "x-api-key: $API_KEY" $BASE_URL/api/v1/keys | jq

# Test rate limiting
echo -e "\n${GREEN}Testing rate limiting${NC}"
for i in {1..5}; do
  curl -s -H "x-api-key: $API_KEY" $BASE_URL/api/health > /dev/null
  echo "Request $i completed"
done 