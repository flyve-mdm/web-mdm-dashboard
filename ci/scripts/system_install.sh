#!/bin/bash

# System dependencies
echo "deb http://ftp.us.debian.org/debian/ jessie main contrib non-free" > /etc/apt/sources.list
echo "deb http://security.debian.org/ jessie/updates main contrib non-free" >> /etc/apt/sources.list
echo "deb http://ftp.us.debian.org/debian/ jessie-updates main contrib non-free" >> /etc/apt/sources.list
echo "deb http://ftp.us.debian.org/debian/ jessie-backports main contrib non-free" >> /etc/apt/sources.list
apt-get -y update
apt-get -y install -t jessie-backports  openjdk-8-jre-headless ca-certificates-java
apt-get -y install jq python-pip zip unzip wget xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 ruby-full

# Configure encoding for ruby scripts
export LANG=en_US.UTF-8
export LANGUAGE=en_US.UTF-8
export LC_ALL=en_US.UTF-8
