# Use official Node.js image as base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm ci --force 

RUN npm install sharp --force

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port
EXPOSE 3002

# Command to run the application
CMD ["npm", "start"]