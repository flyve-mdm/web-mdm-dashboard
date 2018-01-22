#!/bin/bash

if [[ $TRAVIS_COMMIT_MESSAGE != *"ci(release): generate CHANGELOG.md for version"* ]]; then

    # Generate CHANGELOG.md and increment version
    yarn release -- -m "ci(release): generate CHANGELOG.md for version %s"
    # Get version number from package.json
    export GIT_TAG=$(jq -r ".version" package.json)
    # Copy CHANGELOG.md to gh-pages branch
    yarn gh-pages-changelog -- -m "ci(docs): generate CHANGELOG.md for version ${GIT_TAG}"
    # Push commits and tags to origin branch
    git push --follow-tags origin $TRAVIS_BRANCH
    # Create release with conventional-github-releaser
    yarn conventional-github-releaser -- -p angular -t $GITHUB_TOKEN
fi

if [[ $TRAVIS_COMMIT_MESSAGE != *"ci(stats): generate stats.json for version"* ]]; then
    git add reports
    yarn gh-pages-reports -- -m "ci(stats): generate stats.json for version ${GIT_TAG}"
fi