#!/bin/bash
echo "Starting Wrangler with local D1 database..."
npx wrangler dev src/index.tsx --port 8087 --local --persist-to .wrangler/state
