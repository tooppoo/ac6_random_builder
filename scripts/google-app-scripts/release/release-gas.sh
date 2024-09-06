#!/bin/bash

set -euo pipefail

target="$1"
version="$2"

if [ -z "$target" ]; then
  ehco "target is required as 1st argument"
  exit 1;
fi
if [ -z "$version" ]; then
  ehco "version is required as 2nd argument"
  exit 1;
fi

tag="google-app-scripts/$target/$version"

echo "git tag --delete $tag"
git tag --delete "$tag" || true
echo "git push --delete origin $tag"
git push --delete origin "$tag" || true

echo "git tag $tag"
git tag "$tag"
echo "git push origin $tag"
git push origin "$tag"
