#!/bin/bash

rm -rf lib
edp build -f -s commonjs
cd output
mv asset/* .
rm -rf asset
cd ..
mv output lib
