#!/bin/bash
# Set locales
export LC_ALL=C.UTF-8
export LANG=en_US.UTF-8
export LANGUAGE=en_US.UTF-8

if [[ $CIRCLE_BRANCH != "develop" ]]; then

  # Get old version number from package.json
  export GIT_OLD_TAG=$(jq -r ".version" package.json)
  # Generate CHANGELOG.md and increment version
  IS_PRERELEASE="$( cut -d '-' -f 2 <<< "$GIT_OLD_TAG" )";

  if [[ $GIT_OLD_TAG != "$IS_PRERELEASE" ]]; then

    PREFIX_PRERELEASE="$( cut -d '.' -f 1 <<< "$IS_PRERELEASE" )";
    yarn release -m "ci(release): generate CHANGELOG.md for version %s" --prerelease "$PREFIX_PRERELEASE"

  else

    yarn release -m "ci(release): generate CHANGELOG.md for version %s"

  fi

fi

# Get new version number from package.json
export GIT_TAG=$(jq -r ".version" package.json)
# Genarate coverage
yarn coverage
# Add headers to all HTML files of the coverage
ruby ci/scripts/add_header.rb
# Add spaces between '{{' and '}}' characters in the coverage
ruby ci/scripts/add_space.rb coverage
# Add docs folder
git add coverage -f
# Create commit, NOTICE: this commit is not sent
git commit -m "ci(docs): generate **coverage** for version ${GIT_TAG}"
# Copy code coverage to gh-pages branch
yarn gh-pages-coverage --dest $COVERAGE_DESTINATION -m "ci(docs): generate code coverage for version ${GIT_TAG}"

# GITHUB_COMMIT_MESSAGE=$(git log --format=oneline -n 1 ${CIRCLE_SHA1})

# if [[ $GITHUB_COMMIT_MESSAGE != *"ci(stats): generate stats.json for version"* ]]; then
#     git add reports -f
#     yarn gh-pages-reports -m "ci(stats): generate stats.json for version ${GIT_TAG}"
# fi
