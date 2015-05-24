#!/usr/bin/env bash

git push origin master
bundle exec cap production deploy
bundle exec cap productionroot deploy
