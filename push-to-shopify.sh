#!/bin/bash
# Push theme files to Shopify via API
# NOTE: Set SHOPIFY_TOKEN environment variable before running

THEME_ID=153227329583
STORE="http-stehlenauto-com.myshopify.com"
TOKEN="${SHOPIFY_TOKEN}"
THEME_DIR="/home/ssm-user/clawd/stehlen-auto-theme"

if [ -z "$TOKEN" ]; then
    echo "Error: SHOPIFY_TOKEN environment variable not set"
    exit 1
fi

push_file() {
    local file_path=$1
    local key=$2
    
    local content=$(cat "$file_path" | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))")
    
    curl -s -X PUT "https://${STORE}/admin/api/2024-01/themes/${THEME_ID}/assets.json" \
        -H "X-Shopify-Access-Token: ${TOKEN}" \
        -H "Content-Type: application/json" \
        -d "{\"asset\": {\"key\": \"${key}\", \"value\": ${content}}}" > /dev/null
    
    echo "Pushed: ${key}"
}

# Push common files
push_file "${THEME_DIR}/templates/index.json" "templates/index.json"
push_file "${THEME_DIR}/assets/custom-hero.css" "assets/custom-hero.css"
push_file "${THEME_DIR}/snippets/stylesheets.liquid" "snippets/stylesheets.liquid"

echo "Done!"
