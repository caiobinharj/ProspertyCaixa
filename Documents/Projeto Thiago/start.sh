#!/bin/bash
# Start script for Railway deployment

# Generate Prisma Client if not already generated
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Start the server
npm start



