#!/usr/bin/env sh

if [ -f .env ]; then
  rm .env
fi

echo SESSION_SECRET="$SESSION_SECRET" >> .env
echo SESSION_EXPIRATION="$SESSION_EXPIRATION" >> .env
echo SALT_ROUNDS="$SALT_ROUNDS" >> .env
echo MONGO_URI="$MONGO_URI" >> .env
echo BUCKET="$BUCKET" >> .env
echo IAM_KEY="$IAM_KEY" >> .env
echo IAM_SECRET="$IAM_SECRET" >> .env
echo TAG="$TAG" >> .env
echo EMAIL="$EMAIL" >> .env
echo DOMAINS="$DOMAINS" >> .env
echo PORTS="$PORTS" >> .env
echo SERVICES="$SERVICES" >> .env
echo HUB_API="$HUB_API" >> .env
