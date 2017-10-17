#!/bin/bash

sed -i '' '/console.log/d' ./node_modules/serverless-webpack/lib/wpwatch.js
