#!/bin/bash
# Set locales
export LC_ALL=C.UTF-8
export LANG=en_US.UTF-8
export LANGUAGE=en_US.UTF-8
# Generate CHANGELOG.md and increment version
IS_PRERELEASE="$( cut -d '-' -f 2 <<< "$CIRCLE_BRANCH" )";

if [[ $CIRCLE_BRANCH != "$IS_PRERELEASE" ]]; then

  PREFIX_PRERELEASE="$( cut -d '.' -f 1 <<< "$IS_PRERELEASE" )";
  yarn release -m "ci(release): generate CHANGELOG.md for version %s" --prerelease "$PREFIX_PRERELEASE"

else

  yarn release -m "ci(release): generate CHANGELOG.md for version %s"

fi
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
