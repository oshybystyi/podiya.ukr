#!/usr/bin/env bash

#
# Sync db and files from production
#

# remove old dump
echo Remove old dump from remote
ssh root@poya "if [ -d /tmp/events-app-dump ]; then rm -r /tmp/events-app-dump; fi"

# making a dump
echo Create a dump
ssh root@poya "mongodump -d events-app -o /tmp/events-app-dump"

# rm current dump if exists
echo Remove current dump folder on local
if [ -d /tmp/events-app-dump ]; then rm -r /tmp/events-app-dump; fi

# copy db from remote to local
echo Copy dump from remote to local
rsync --partial --progress --append --rsh=ssh -r -h root@poya:/tmp/events-app-dump/ /tmp/events-app-dump

# import db into mongo
echo Restoring dump into mongo
mongorestore --drop --db events-app /tmp/events-app-dump/events-app

# copy images
echo Copy images from remote to local
rsync --partial --progress --append --rsh=ssh -r -h root@poya:/var/nodewww/events-app/current/public/uploads/ ./public/uploads/
