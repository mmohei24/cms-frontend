# Use Node.js as base image
FROM node:latest AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Stage 2: Use Node.js as base image to serve the Angular app
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the built Angular app from the previous stage
COPY --from=builder /app/dist ./dist

EXPOSE 4200

# start the Angular app
CMD ["npm", "start"]
