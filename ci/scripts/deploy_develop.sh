#!/bin/bash

# Generate CHANGELOG.md and increment version
yarn release
# Get version number from package.json
export GIT_TAG=$(jq -r ".version" package.json)
# Generate documentation with jsdoc
yarn jsdoc 
# Add docs folder
git add docs -f
# Create commit, NOTICE: this commit is not sent
git commit -m "ci(docs): generate **docs** for version ${GIT_TAG}"
# Copy documentation to gh-pages branch
yarn gh-pages-docs -m "ci(docs): generate documentation with jsdoc for version ${GIT_TAG}"
# Copy screenshots to gh-pages branch
yarn gh-pages-screenshots -m "ci(docs): take screenshots of the dashboard automatically"
# Genarate coverage
yarn coverage
# Add headers to all HTML files of the coverage
export LC_ALL=C.UTF-8
ruby ci/scripts/add_header.rb
# Add spaces between '{{' and '}}' characters in the coverage
ruby ci/scripts/add_space.rb
# Add docs folder
git add coverage -f
# Create commit, NOTICE: this commit is not sent
git commit -m "ci(docs): generate **coverage** for version ${GIT_TAG}"
# Copy code coverage to gh-pages branch
yarn gh-pages-coverage -m "ci(docs): generate code coverage for version ${GIT_TAG}"

GITHUB_COMMIT_MESSAGE=$(git log --format=oneline -n 1 ${CIRCLE_SHA1})

if [[ $GITHUB_COMMIT_MESSAGE != *"ci(stats): generate stats.json for version"* ]]; then
    git add reports -f
    yarn gh-pages-reports -m "ci(stats): generate stats.json for version ${GIT_TAG}"
fi
