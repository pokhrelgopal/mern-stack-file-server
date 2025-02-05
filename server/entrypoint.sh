#!/bin/sh

# Wait for PostgreSQL to be ready
/wait-for-it.sh postgres:5432 --timeout=30 --strict -- echo "PostgreSQL is up and running"

# Run database migrations
npx prisma migrate deploy

# Start the application
npm run dev