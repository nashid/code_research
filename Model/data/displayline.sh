#!/bin/bash

FILE1=$1
FILE2=$2
LN="$3p"

echo $FILE1
echo $(sed -n $LN $FILE1)

echo $FILE2
echo $(sed -n $LN $FILE2)
