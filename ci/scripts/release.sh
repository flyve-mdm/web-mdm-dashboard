#!/bin/bash

GITHUB_COMMIT_MESSAGE=$(git log --format=oneline -n 1 ${CIRCLE_SHA1})

if [[ $GITHUB_COMMIT_MESSAGE != *"ci(release): generate CHANGELOG.md for version"* ]]; then

    # Generate CHANGELOG.md and increment version
    yarn release -m "ci(release): generate CHANGELOG.md for version %s"
    # Get version number from package.json
    export GIT_TAG=$(jq -r ".version" package.json)
    # Copy CHANGELOG.md to gh-pages branch
    yarn gh-pages-changelog -m "ci(docs): generate CHANGELOG.md for version ${GIT_TAG}"
    # Push commits and tags to origin branch
    git push --follow-tags origin $CIRCLE_BRANCH
    # Create release with conventional-github-releaser
    yarn conventional-github-releaser -p angular -t $GITHUB_TOKEN

    # Upload build file to release
    yarn github-release upload \
    --user "${CIRCLE_PROJECT_USERNAME}" \
    --repo "${CIRCLE_PROJECT_REPONAME}" \
    --tag "v${GIT_TAG}" \
    --name "build.zip" \
    --file "./build.zip"

    # Update develop branch
    git fetch origin develop
    git checkout develop
    git merge $CIRCLE_BRANCH
    git push origin develop

    # Update master branch
    git fetch origin master
    git checkout master
    git merge $CIRCLE_BRANCH
    git push origin master
fi
