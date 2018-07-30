#!/bin/bash
# Set locales
export LC_ALL=C.UTF-8
export LANG=en_US.UTF-8
export LANGUAGE=en_US.UTF-8
# Generate CHANGELOG.md and increment version
yarn release
# Get version number from package.json
export GIT_TAG=$(jq -r ".version" package.json)
# Generate documentation with jsdoc
yarn docs
# Add spaces between '{{' and '}}' characters
ruby ci/scripts/add_space.rb docs
# Add docs folder
git add docs -f
# Create commit, NOTICE: this commit is not sent
git commit -m "ci(docs): generate **docs** for version ${GIT_TAG}"
# Copy documentation to gh-pages branch
yarn gh-pages-docs -m "ci(docs): generate documentation with jsdoc for version ${GIT_TAG}"
