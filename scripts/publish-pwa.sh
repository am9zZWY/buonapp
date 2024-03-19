#!/usr/bin/env sh
# This script is used to publish the PWA to the gh-pages branch

# build the app
bun run build

# navigate into the build output directory
cd dist || exit

# deploy to github pages
git init
git add -A

# change user config
git config user.name "buonuser"
git config user.email ""
git config --local commit.gpgsign false

# deploy
git commit -m 'deploy'
git branch -M main
git remote add origin git@github.com:buonapp/buonapp.github.io.git
git push -u -f origin main

# remove the build directory
cd - || exit
rm -rf dist
