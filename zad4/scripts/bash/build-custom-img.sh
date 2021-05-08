#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

docker build -t proj_obj4 "${SCRIPT_DIR}/../../custom_image"