#!/bin/bash

# emulate env vars for jenkins env vars
if [ "${BUILD_NUMBER}" = "" ]; then
  export BUILD_NUMBER=999
fi

postfix=$1

echo "postfix is set to '${postfix}'"

sed -i "s/kyc.useb.co.kr/kyc${postfix}.useb.co.kr/" js/kyc.js

sed -i -E "s/(src=\"[^=]*=)(__VERSION__)/\1${BUILD_NUMBER}${postfix}/g" index.html
sed -i -E "s/(src=\"[^=]*=)(__VERSION__)/\1${BUILD_NUMBER}${postfix}/g" test.html
sed -i -E "s/(href=\"[^=]*=)(__VERSION__)/\1${BUILD_NUMBER}${postfix}/g" index.html
sed -i -E "s/(href=\"[^=]*=)(__VERSION__)/\1${BUILD_NUMBER}${postfix}/g" test.html

exit 0


