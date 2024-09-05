#!/bin/bash

set -euo pipefail

target=$1
version=$2

if [ -z "$target" ]; then
  ehco "target is required as 1st argument"
  exit 1;
fi
if [ -z "$version" ]; then
  ehco "version is required as 2nd argument"
  exit 1;
fi

tag="google-app-scripts/$target/$version"

git tag "$tag"
git push origin "$tag" || true
