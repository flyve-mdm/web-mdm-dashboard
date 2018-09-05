#!/bin/bash

# Get version number from package.json
export GIT_TAG=$(jq -r ".version" package.json)
# Copy screenshots to gh-pages branch
yarn gh-pages-screenshots -m "ci(docs): take dashboard screenshots for version ${GIT_TAG}"
