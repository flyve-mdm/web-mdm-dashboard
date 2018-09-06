#!/bin/bash

GITHUB_COMMIT_MESSAGE=$(git log --format=oneline -n 1 ${CIRCLE_SHA1})

if [[ $GITHUB_COMMIT_MESSAGE != *"ci(release): generate CHANGELOG.md for version"* ]]; then

  # Get old version number from package.json
  export GIT_TAG=$(jq -r ".version" package.json)
  # Generate CHANGELOG.md and increment version
  IS_PRERELEASE="$( cut -d '-' -f 2 <<< "$GIT_TAG" )";

  if [[ $GIT_TAG != "$IS_PRERELEASE" ]]; then

    PREFIX_PRERELEASE="$( cut -d '.' -f 1 <<< "$IS_PRERELEASE" )";
    yarn release --skip.bump=true -m "ci(release): generate CHANGELOG.md for version %s" --prerelease "$PREFIX_PRERELEASE"

  else

    yarn release --skip.bump=true -m "ci(release): generate CHANGELOG.md for version %s"

  fi

  # Copy CHANGELOG.md to gh-pages branch
  yarn gh-pages-changelog -m "ci(docs): generate CHANGELOG.md for version ${GIT_TAG}"
  # Push commits and tags to origin branch
  git push --follow-tags origin $CIRCLE_BRANCH
  # Create release with conventional-github-releaser
  yarn conventional-github-releaser -p angular -t $GITHUB_TOKEN

  if [[ $CIRCLE_BRANCH != "$IS_PRERELEASE" ]]; then

    # Upload build file to release
    yarn github-release upload \
    --user "${CIRCLE_PROJECT_USERNAME}" \
    --repo "${CIRCLE_PROJECT_REPONAME}" \
    --tag "v${GIT_TAG}" \
    --name "build.zip" \
    --file "./build.zip"

  else

    # Upload build file to prerelease
    yarn github-release upload \
    --user "${CIRCLE_PROJECT_USERNAME}" \
    --repo "${CIRCLE_PROJECT_REPONAME}" \
    --tag "v${GIT_TAG}" \
    --name "build.zip" \
    --file "./build.zip" \
    --pre-release

  fi

  # Update master branch
  git fetch origin master
  git checkout master
  git clean -d -x -f
  git merge $CIRCLE_BRANCH
  git push origin master

  # Update develop branch
  git fetch origin develop
  git checkout develop
  git clean -d -x -f
  git merge $CIRCLE_BRANCH
  git push origin develop

fi
