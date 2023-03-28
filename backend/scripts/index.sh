#!/usr/bin/bash

DATASOURCE_PATH="dist/config/db/db.datasource.js"

if [ $1 == 'migration' ]; then
    if [ $2 == 'run' ]; then
    # echo ${DATASOURCE_PATH}
        yarn run typeorm migration:run -d $DATASOURCE_PATH
    elif [ ! $3 ]; then
        echo "Provide name for migration"
        exit 1
    elif [ $2 == 'create' ]; then
        yarn run typeorm migration:create ./migrations/$3 -o
    elif [ $2 == 'generate' ]; then
        yarn run typeorm -d $DATASOURCE_PATH migration:generate ./migrations/$3 -o
    fi
fi