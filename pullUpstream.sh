#!/bin/bash

echo Pulling upstream!
git status
git pull --rebase upstream master
