---
layout: post
howtos: true
published: true
title: Installation
permalink: howtos/installation
description: Get it now
---
# Web Dashboard Installation

## First of all

You require to have installed [GLPI](http://glpi-project.org/?lang=en) since you'll require the GLPI API. To install it please refer to the respective documentation.

## Get Flyve MDM Web Dashboard

You can download it with any of these methods:

1. [Download the latest release from GitHub](https://github.com/flyve-mdm/web-mdm-dashboard/releases)
2. Clone the repo:

```console
    git clone https://github.com/flyve-mdm/web-mdm-dashboard.git
```

## Install Dependencies

The following commands can be used either with npm or yarn

* Run one of the following commands:

```console
    npm install
```

## Cofigure the Dashboard

* Add the url of the GLPI API and the User Token in the config.json file, which is located in the src directory.

You can find the GLPI API url in Setup>General>API
The User Token can be found in Administration>Users>Settings - Remote Access Keys

![GLPI](https://raw.githubusercontent.com/Naylin15/Screenshots/master/dashboard-legacy/api-legacy-dashboard.png)

* For building, use one of the following commands depending of the package manager you prefer
 
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

