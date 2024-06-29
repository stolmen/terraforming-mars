#!/bin/bash

npm run build # required to build the card json files

npm run dev:client &
npm run dev:server
