# Use the official Node.js image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencie
RUN npm install

# Copy the application code to the working directory
COPY src/public/ ./public
COPY src/server.js .

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
