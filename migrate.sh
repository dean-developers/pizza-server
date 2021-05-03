#!/bin/sh

set -e

until npm run migrate ; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
# PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_HOST" -U "postgres" -c 'CREATE DATABASE endotech'
# PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_HOST" -U "postgres" -d endotech -f /schema.sql
npm run migrate