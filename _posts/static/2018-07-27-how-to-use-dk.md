---
layout: howtos
published: true
title: How to use
permalink: howtos/how-to-use-dk
description: Useful commands
category: docker
---

## Commands

In this article we show you how to use the environment and how to execute the commands of Nodejs and YARN in your environment.

### Index

- [1. Start all containers](#1)
- [2. Start all containers in background](#2)
- [3. Stop all containers](#3)
- [4. Enter in the containers](#4)
  - [4.1 Executing commands](#4.1)

### 1. Start all containers <a name="1"/>

To start all containers in this environment, you must execute the following command after entering the docker folder in the project root: ```docker-compose up```. This command starts all containers stopped.

```console
user@localhost:web-mdm-dashboard/docker $ docker-compose up
Starting Dashboard-apache
Starting Dashboard-Node
Attaching to Dashboard-apache, Dashboard-Node
```

Notice that after executing the command, it will display an output indicating the starting process of the containers, in this part the container NodeJS is executing the command ```yarn start```.
If we see an output like this, it's an indicator that the containers are ready for work and we can continue.

![Terminal output](https://i.imgur.com/4Hme74v.png)

### 2. Start all containers in background <a name="2"/>

To start all containers in background, you must execute the following command after entering the docker folder in the project root: ```docker-compose start```. This command starts all containers in background.

```console
user@localhost:web-mdm-dashboard/docker $ docker-compose start
Starting Dashboard-apache
Starting Dashboard-Node
Attaching to Dashboard-apache, Dashboard-Node
```

Notice that after executing the command, it will display an output indicating the starting process of the containers in background, in this part the container NodeJS is executing the command ```yarn start``` in background and we can't see the progress.

This command is useful, only if you don't need to see the output of the start command.

<img src="{{ '/images/picto-information.png' | absolute_url }}" alt="Good to know:" height="16px"/> To check the containers running you can use the command: ```docker ps```. It will display a table with the containers running, the commands, status and ports.

### 3. Stop all containers <a name="3"/>

To stop all containers in this environment, you must execute the following command after entering the docker folder in the project root: ```docker-compose stop```. This command stop all containers with all its configuration saved.

```console
user@localhost:web-mdm-dashboard/docker $ docker-compose stop
Stopping Dashboard-Node ... done
Stopping Dashboard-apache ... done
```

Notice that after executing the command, it will display an output indicating the stopping process of the containers.

### 4. Enter in the containers <a name="4"/>

The containers must be running in order to enter them.

#### Enter in Dashboard-Node

In this container we can execute all commands corresponding to NodeJS and Yarn. To enter in this container and stay inside in the container terminal, we must follow these steps:

- Open a terminal in your computer.
- Execute this command:

```user@localhost:~ $ docker exec -ti Dashboard-Node bash```

Where the parameters are:

    -i, --interactive          Keep STDIN open even if not attached
    -t, --tty                  Allocate a pseudo-TTY

#### Enter in Dashboard-Apache

In this container we can see all files corresponding to the build directory.

To enter in this container and stay inside in the container terminal, we must follow these steps:

- Open a terminal in the host machine.
- Execute this command:

```user@localhost:~ $ docker exec -ti Dashboard-apache bash```

Where the parameters are:

    -i, --interactive          Keep STDIN open even if not attached
    -t, --tty                  Allocate a pseudo-TTY

#### 4.1 Execute command and exit of terminal <a name="4.1"/>

To execute commands inside containers without staying in its terminal, you can use the following syntax. It will enter the container, execute the given command and finally exit the container.

##### Dashboard-Node

You can execute a command of NodeJS or/and Yarn, for example, if you want to run the command ```yarn build```, you must write it as it follows:

```user@localhost:~ $ docker exec -ti Dashboard-Node runuser root -c "yarn build"```

Where the parameters are:

    -i, --interactive          Keep STDIN open even if not attached
    -t, --tty                  Allocate a pseudo-TTY

Notice that between the quotes is the command to execute.
