#!/usr/bin/bash

DATASOURCE_PATH="dist/config/db/db.datasource.js"

if [ $1 == 'drop' ]; then
    yarn run typeorm schema:drop -d $DATASOURCE_PATH
fi

if [ $1 == 'migration' ]; then
    if [ $2 == 'run' ]; then
        yarn run typeorm migration:run -d $DATASOURCE_PATH
    elif [ $2 == 'revert' ]; then
        yarn run typeorm migration:revert -d $DATASOURCE_PATH
    elif [ $2 == 'show' ]; then
        yarn run typeorm migration:show -d $DATASOURCE_PATH
    elif [ ! $3 ]; then
        echo "Provide name for migration"
        exit 1
    elif [ $2 == 'create' ]; then
        yarn run typeorm migration:create ./migrations/$3 -o
    elif [ $2 == 'generate' ]; then
        yarn run typeorm -d $DATASOURCE_PATH migration:generate ./migrations/$3 -o
    fi
fi

if [ $1 == 'newentity' ]; then
    if [ ! $2 ]; then
        echo 'Provide path to create entity'
        exit 1;
    else
        yarn run typeorm entity:create $2
    fi
fi