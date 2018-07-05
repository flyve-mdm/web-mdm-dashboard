#ARGS
ARG NODE_TAG=${NODE_TAG}

FROM node:${NODE_TAG}

ARG APPPATH=${APPPATH}
ENV APPPATH ${APPPATH}
# Install modules
RUN apt-get update --fix-missing && apt-get install -y curl nano git
WORKDIR /app
RUN yarn install

