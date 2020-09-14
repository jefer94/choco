#!/bin/sh

docker-compose up -d nats
docker-compose up -d mongo

./scripts/development/execute.sh activity &
# ./scripts/development/execute.sh algorithm &
./scripts/development/execute.sh authenticator &
./scripts/development/execute.sh cache &
./scripts/development/execute.sh graphql-gateway &
./scripts/development/execute.sh projects &
./scripts/development/execute.sh world-cities-seed &
