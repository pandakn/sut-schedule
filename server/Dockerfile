# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Copy the entire project directory to the working directory
COPY . .

# Expose the port on which your application will run
EXPOSE 3000

# Specify the command to start your application
CMD [ "npm", "start" ]