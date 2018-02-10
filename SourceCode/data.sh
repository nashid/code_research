#!/bin/bash

rm -rf '../Model/data/TrainingData/'
rm -rf '../Model/data/TestData/'
rm -rf '../Model/data/DevData/'

npm run cleandir
n=1000 npm run mutate
npm run tokenize
npm run generate_vocab
python commonvocab.py 20
fn='./TrainingData/' npm run data
cp -r './TrainingData/' '../Model/data/'

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

cp -r './Vocab' '../Model/data/'
rm -rf './Vocab/'
