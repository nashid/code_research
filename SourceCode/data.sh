#!/bin/bash

rm -rf '../Model/data/TrainData/'
rm -rf '../Model/data/TestData/'
rm -rf '../Model/data/DevData/'

npm run cleandir
npm run processdata
npm run tokenize
npm run generate_vocab
python commonvocab.py 5000
fn='./TrainData/' npm run data
cp -r './TrainData/' '../Model/data/'

npm run cleandir
npm run processdata
npm run tokenize
npm run generate_vocab
python commonvocab.py 5000
fn='./TestData/' npm run data
cp -r './TestData/' '../Model/data/'

npm run cleandir
npm run processdata
npm run tokenize
npm run generate_vocab
python commonvocab.py 5000
fn='./DevData/' npm run data
cp -r './DevData/' '../Model/data/'

npm run formatvocab
cp -r './Vocab' '../Model/data/'
npm run cleandir
rm -rf './Vocab/'
