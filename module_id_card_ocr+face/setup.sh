#!/bin/bash

rm -rf .env;
`cp -p .env.${NODE_ENV} .env`

