#!/bin/sh
set -e

OPTS=$(getopt -o e:b: --long env:,bucket: -- "$@")

if [ $? != 0 ]; then
  echo "Failed parsing arguments." >&2
  exit 1
fi

eval set -- "$OPTS"

while true; do
  case "$1" in
  -e | --env)
    env="$2"
    shift
    shift
    ;;
  -b | --bucket)
    bucket="$2"
    shift
    shift
    ;;
  --)
    shift
    break
    ;;
  *) break ;;
  esac
done

aws s3 rm s3://${bucket}/ --recursive
aws s3 cp dist s3://${bucket}/ --recursive
