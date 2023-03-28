#!/usr/bin/bash

if [ $1 == 'migration' ]; then
    if [ $2 == 'run' ]; then
        echo "run migrations"
    elif [ ! $3 ]; then
        echo "Provide name for migration"
        exit 1
    elif [ $2 == 'create' ]; then
        yarn run typeorm migration:create ./migrations/$3 -o
    elif [ $2 == 'generate' ]; then
        yarn run typeorm -d dist/src/config/db/db.datasource.js migration:generate ./migrations/$3 -o
    fi
fi