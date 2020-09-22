#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
docker rm -f ra-front
docker build --no-cache -t ra-front:latest .
docker run -d -p 4402:80 --name=ra-front ra-front