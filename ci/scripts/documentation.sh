#!/bin/bash

# Generate CHANGELOG.md and increment version
yarn release
# Get version number from package.json
export GIT_TAG=$(jq -r ".version" package.json)
# Generate documentation with jsdoc
yarn docs
# Add spaces between '{{' and '}}' characters in the coverage
ruby ci/scripts/add_space.rb
# Add docs folder
git add docs -f
# Create commit, NOTICE: this commit is not sent
git commit -m "ci(docs): generate **docs** for version ${GIT_TAG}"
# Copy documentation to gh-pages branch
yarn gh-pages-docs -m "ci(docs): generate documentation with jsdoc for version ${GIT_TAG}"
