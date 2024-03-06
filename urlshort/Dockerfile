# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app


# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install TypeScript and ts-node globally
RUN npm install -g typescript ts-node

# Set up the TypeScript compiler options
COPY tsconfig.json .

# Install dependencies
RUN npm install

# Copy all source code to the container
COPY . .

COPY ./public /app/public

# Compile TypeScript code to JavaScript
RUN tsc

# Expose port 3000
EXPOSE 3000

# Command to run the Node.js application using ts-node
CMD ["node", "dist/server.js"]
