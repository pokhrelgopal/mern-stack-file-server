# Use official Node.js image as base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install wait-for-it script to wait for PostgreSQL to be ready
RUN apk add --no-cache wget
RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Use an entrypoint script to wait for PostgreSQL and then run migrations
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port
EXPOSE 5000

# Use the entrypoint script
ENTRYPOINT ["/entrypoint.sh"]