---
layout: post
howtos: true
published: true
title: Installation
permalink: howtos/installation-dk
description: Building and configuring the environment
category: docker
---

## Get the Web MDM Dashboard

To start with the installation process, we must get the [Web MDM Dashboard](https://github.com/flyve-mdm/web-mdm-dashboard) from its source.

- Using git, clone the repo: ```git clone https://github.com/flyve-mdm/web-mdm-dashboard.git```
- [Download the project from GitHub](https://github.com/flyve-mdm/web-mdm-dashboard/archive/develop.zip)
- [From GitHub Releases](https://github.com/flyve-mdm/web-mdm-dashboard/releases)

### If you're on Linux, Mac OS or Windows

#### 1. Enter into the docker directory

After we get the project, we enter into docker directory located in root.

```user@localhost:web-mdm-dashboard $ cd docker```

#### 2. Build up the containers

In the terminal, execute the command corresponding to build the docker environment:

```user@localhost:web-mdm-dashboard/docker $ docker-compose up --build```

This process downloads the docker images, build the containers, execute the configuration, create the network interface and start running all containers.

### 3. Enter to see the Application

#### Developer environment

To enter in the application in developer mode, we must enter in the browser the address:
    ```http://localhost:3000```

#### Build environment

To enter in the application in Build mode, we must enter in the browser the address:
    ```http://localhost:8081```

The Ports described in this step, are corresponding to the configured in the **.env* file**

#### Note

<img src="{{ '/images/picto-information.png' | absolute_url }}" alt="Good to know" height="16px"/> After installing and configuring the docker containers, this environment execute the installation process of Web MDM Dashboard project with package manager YARN, in this order:

- yarn install (only the first time)
- yarn build (only the first time)
- yarn start

You must see an output display as this one in your terminal:

![Terminal Output](https://i.imgur.com/EFxXKQm.png)

This output is an indicator that the environment is ready for work.