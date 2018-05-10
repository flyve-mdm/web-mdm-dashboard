#!/bin/bash

cat <<EOF >public/config.json
{
    "selfRegistration": true,
    "glpiApiLink": "$API_LINK",
    "userToken": "$USER_TOKEN",
    "appName": "MDM Dashboard"
}
EOF
