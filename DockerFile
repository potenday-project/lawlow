# https://hub.docker.com/_/node
FROM node:16-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies and build
RUN yarn install
RUN yarn build

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "yarn", "start" ]
