# Use official Node.js image as base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client and push database schema
RUN npx prisma generate && npx prisma db push

# Expose port (adjust as needed)
EXPOSE 8000

# Command to run the application
CMD ["npm", "run", "dev"]