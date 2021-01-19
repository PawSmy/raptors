#!/usr/bin/env bash
docker rm -f ra-back
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
docker build --no-cache -t ra-back:latest .
docker run -d --net=ra-bridge -p  4401:8080 --name=ra-back ra-back