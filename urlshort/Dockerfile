# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code to the container
COPY . .

# Expose port 3000 (assuming your Node.js server runs on port 3000)
EXPOSE 3000

# Command to run the Node.js application
CMD [ "node", "server.ts" ]
