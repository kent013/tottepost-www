#!/bin/bash

for file in www/lang-*.json; do
  twine generate-string-file strings.txt $file --tags=common --encoding utf-8
done
