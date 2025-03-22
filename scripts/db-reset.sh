#!/bin/bash

# Stop the Supabase services
echo "Stopping Supabase services..."
supabase stop

echo "Removing Docker containers..."
docker ps -a | grep supabase | awk '{print $1}' | xargs -r docker rm -f

echo "Removing Docker volumes..."
docker volume ls | grep supabase | awk '{print $2}' | xargs -r docker volume rm

# Start Supabase with a fresh state
echo "Starting Supabase with fresh state..."
supabase start

# Reset the database (this will run migrations and seeds)
echo "Resetting database and running migrations..."
supabase db reset

echo "Database reset completed!"
echo "Test user credentials:"
echo "Email: test@example.com"
echo "Password: password123"
