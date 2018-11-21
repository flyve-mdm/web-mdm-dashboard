---
layout: howtos
published: true
title: Installation
permalink: howtos/installation
description: Get it now
category: user
---

The Web MDM Dashboard works in conjuction with [Flyve MDM plugin](http://flyve.org/glpi-plugin/) for GLPI.

The plugin must be already installed in your GLPI instance, as they provide features to the Dashboard. For more information, check the [documentation](https://flyvemdm-doc.readthedocs.io/en/latest/) of Flyve MDM plugin for GLPI, there your'll find instructions and links that will help you to make a successful installation of GLPI + Flyve MDM.

### Compatibility Matrix

<table class="zebra-table">
    <tr>
        <th style="width:200px">GLPI</th>
        <td style="width:100px">9.1.x</td>
        <td>9.2.x+</td>
    </tr>
    <tr>
        <th>Flyve MDM plugin</th>
        <td>1.x.x</td>
        <td>2.0.0</td>
    </tr>
    <tr>
        <th>Web MDM Dashboard</th>
        <td>-</td>
        <td>2.0.0</td>
    </tr>
</table>

## Get Flyve MDM Web Dashboard

You can download it with any of these methods:

1. [Download the latest release from GitHub](https://github.com/flyve-mdm/web-mdm-dashboard/releases)
1. [Download the zip file](https://github.com/flyve-mdm/web-mdm-dashboard/archive/develop.zip) (Develop branch)
1. Using Git, clone the repo:

```console
git clone https://github.com/flyve-mdm/web-mdm-dashboard.git
```

## Configure the Dashboard

* Go to public/config.example.js
* Rename the file to config.js
* Add the url of your GLPI API, where indicated.
    * Optional setting:
        * bugsnag: your url to your bugsnag link, for catching bugs

<img src="{{ 'images/picto-information.png' | absolute_url }}" alt="Good to know!" height="16"> You can find the GLPI API url in Setup>General>API

<img src="{{ 'images/posts/api-dashboard.png' | absolute_url }}" alt="GLPI">

## Install Dependencies

The following commands can be used either with npm or yarn

* Run the following command:

```console
    npm install
```

* For building, use one of the following commands depending of the package manager you prefer:

```console
    npm run-script build
    yarn build
```

* Check that all tests pass

```console
    npm test
```

* For preview run

```console
    npm start
```

It will open a new tab with a test server localhost:3000.
