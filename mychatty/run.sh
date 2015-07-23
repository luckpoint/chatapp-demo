#!/bin/sh
IP=`ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}'`
PORT=3000
METEOR_JS=~/works/meteor/meteor
CMD="env USE_GLOBAL_ADK=t $METEOR_JS run android-device --mobile-server $IP:$PORT -p $IP:$PORT"
echo $CMD
`$CMD`

