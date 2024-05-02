#!/bin/bash

URL="http://localhost:3111/exec"

BODY='{
	"lodash_fn_name": "join",
	"code": " module.exports = function(arr,separator) { return arr.join(separator) } "
}'

curl -X POST "$URL" \
	-H "Content-Type: application/json" \
	-d "$BODY"
