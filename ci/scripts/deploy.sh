#!/bin/bash

if [[ $TRAVIS_BRANCH = "develop" ]]; then

    source ci/scripts/deploy_develop.sh

fi