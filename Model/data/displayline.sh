#!/bin/bash
# sh displayline.sh code_infer.buggy code_actual.correct code_infer.correct <LN>

FILE1=$1
FILE2=$2
FILE3=$3
LN="$4p"

echo $FILE1
echo $(sed -n $LN $FILE1)

echo $FILE2
echo $(sed -n $LN $FILE2)

echo $FILE3
echo $(sed -n $LN $FILE3)
