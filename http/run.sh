#!/bin/bash
set -e

SERVICE=${1:-provider}

docker compose --profile dev --project-directory "$SERVICE"/ up -d
docker compose --project-directory "$SERVICE"/ exec -ti dev sh
docker compose --profile dev --project-directory "$SERVICE"/ down
