#!/bin/bash

if [[ -n $GITHUB_TOKEN ]]; then
    git config --global user.email $GITHUB_EMAIL
    git config --global user.name "Flyve MDM"
    git remote remove origin
    git remote add origin https://$GITHUB_USER:$GITHUB_TOKEN@github.com/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME.git
fi
