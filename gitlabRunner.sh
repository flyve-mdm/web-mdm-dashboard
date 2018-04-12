#!/usr/bin/env bash

cat /dev/null > ~/.transifexrc
echo $'[https://www.transifex.com]\nhostname = https://www.transifex.com\nusername = '"$TRANSIFEX_USER"$'\npassword = '"$TRANSIFEX_API_TOKEN"$'\ntoken = '"$TRANSIFEX_API_TOKEN"$'' > ~/.transifexrc
tx pull -a
yarn build
rm -r /var/www/public/dashboard
cp -r ./build /var/www/public/dashboard
cp -f ./htaccess_dev /var/www/public/dashboard/.htaccess