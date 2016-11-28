#!/bin/bash

npm run build
cp package.json README.md lib
cd lib
npm publish
