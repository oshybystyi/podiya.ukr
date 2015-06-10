#!/usr/bin/env bash

# Push to repo
git push origin master

# Deploy
bundle exec cap production deploy

# Run root commands (like restart service)
bundle exec cap productionroot deploy
