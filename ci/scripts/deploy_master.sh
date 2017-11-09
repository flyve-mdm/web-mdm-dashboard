#!/bin/bash

if [[ $TRAVIS_COMMIT_MESSAGE != *"ci(release): generate CHANGELOG.md for version"* && $TRAVIS_COMMIT_MESSAGE != *"ci(build): release version"* ]]; then

    # Generate CHANGELOG.md and increment version
    yarn release -- -m "ci(release): generate CHANGELOG.md for version %s"
    # Get version number from package.json
    export GIT_TAG=$(jq -r ".version" package.json)
    # Copy CHANGELOG.md to gh-pages branch
    yarn gh-pages-changelog -- -m "ci(docs): generate CHANGELOG.md for version ${GIT_TAG}"

fi