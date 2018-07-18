#ARGS
ARG APACHE_TAG=${APACHE_TAG}

FROM httpd:${APACHE_TAG}

ARG APPPATH=${APPPATH}
# Environment variables
ENV APPPATH ${APPPATH}

# Install modules
RUN apt-get update && apt-get install -y curl nano
