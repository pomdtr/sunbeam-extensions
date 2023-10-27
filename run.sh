API_ROOT="https://api.val.town"
VAL_ID="ce658f99-0612-40cf-ab75-8677bd16b78b"

sunbeam fetch \
    -X POST \
    -d @- \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $VALTOWN_TOKEN" \
    "$API_ROOT/v1/vals/$VAL_ID/versions"
