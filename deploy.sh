#!/bin/bash
set -e

# Temporarily add baseUrl for GitHub Pages
node -e "
const f = require('fs');
const j = JSON.parse(f.readFileSync('app.json','utf8'));
j.expo.experiments = { baseUrl: '/assessments-cwf' };
f.writeFileSync('app.json', JSON.stringify(j, null, 2) + '\n');
"

# Build
npx expo export --platform web

# Restore app.json
node -e "
const f = require('fs');
const j = JSON.parse(f.readFileSync('app.json','utf8'));
delete j.expo.experiments;
f.writeFileSync('app.json', JSON.stringify(j, null, 2) + '\n');
"

# Deploy
npx gh-pages -d dist

echo "Deployed to https://lansingalong.github.io/assessments-cwf/"
