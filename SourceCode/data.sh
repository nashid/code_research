#!/bin/bash

rm -rf '../Model/data/TrainData/'
rm -rf '../Model/data/TestData/'
rm -rf '../Model/data/DevData/'

npm run cleandir
n=1000 npm run mutate
npm run tokenize
npm run generate_vocab
python commonvocab.py 20
fn='./TrainData/' npm run data
cp -r './TrainData/' '../Model/data/'

npm run cleandir
n=100 npm run mutate
npm run tokenize
fn='./TestData/' npm run data
cp -r './TestData/' '../Model/data/'

npm run cleandir
n=100 npm run mutate
npm run tokenize
fn='./DevData/' npm run data
cp -r './DevData/' '../Model/data/'

npm run formatvocab
cp -r './Vocab' '../Model/data/'
npm run cleandir
rm -rf './Vocab/'
