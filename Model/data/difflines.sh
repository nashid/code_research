#!/bin/sh

FILE1=$1
FILE2=$2

diff -i --unchanged-line-format="¥" --new-line-format=":%dn: %L" $FILE1 $FILE2 | perl -pe 's/¥/\n/g' | perl -pe '$count++; if ($_ !~ /^\n$/){print "$count\t";}'
