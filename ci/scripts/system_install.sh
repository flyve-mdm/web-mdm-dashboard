#!/bin/bash

# System dependencies
apt-get clean
rm /etc/apt/sources.list
echo 'deb http://archive.debian.org/debian/ wheezy main contrib non-free' >> /etc/apt/sources.list
echo 'deb http://archive.debian.org/debian/ jessie-backports main' >> /etc/apt/sources.list.d/openjdk.list
echo 'deb http://archive.debian.org/debian/ jessie main' >> /etc/apt/sources.list.d/openjdk.list
apt-get update -o Acquire::Check-Valid-Until=false
apt-get install -y -t jessie-backports openjdk-8-jre-headless
rm /etc/apt/sources.list.d/openjdk.list
apt-get update

echo '++++++++++++++++++++++++++++++++++++++++'

apt-get -y install python-pip zip unzip wget xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 ruby-full locales jq

# Configure encoding for ruby scripts
echo "LC_ALL=en_US.UTF-8" >> /etc/environment
echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
echo "LANG=en_US.UTF-8" > /etc/locale.conf
locale-gen en_US.UTF-8

# Install yarn
apt-get -y install curl apt-transport-https
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
apt-get update && apt-get -y install yarn
