#!/bin/bash

if [[ $TRAVIS_COMMIT_MESSAGE != *"ci(release): generate CHANGELOG.md for version"* && $TRAVIS_COMMIT_MESSAGE != *"ci(build): release version"* ]]; then

    # Generate CHANGELOG.md and increment version
    yarn release
    # Get version number from package.json
    export GIT_TAG=$(jq -r ".version" package.json)
    # Generate documentation with jsdoc
    jsdoc src -r -d docs 
    # Copy documentation to gh-pages branch
    gh-pages --dist docs --dest docs -m "ci(docs): generate documentation with jsdoc for version ${GIT_TAG}"

fi