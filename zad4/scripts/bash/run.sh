#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

docker run -it \
  -v "${SCRIPT_DIR}/../../app":/app \
  -u root \
  -p 21370:8080 \
  --name proj_obj4 \
  projobj4_custom