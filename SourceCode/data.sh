#!/bin/bash

rm -rf '../Model/data/TrainData/'
rm -rf '../Model/data/TestData/'
rm -rf '../Model/data/DevData/'
rm -rf '../Model/data/Vocab'

npm run cleandir
npm run processdata
npm run tokenize
npm run generate_vocab
python commonvocab.py 450 
cp -r './Vocab' '../Model/data/'

fn='./TrainData/' npm run data
cp -r './TrainData/' '../Model/data/'

#npm run cleandir
#npm run processdata
#npm run tokenize
#npm run generate_vocab
#python commonvocab.py 5000
fn='./TestData/' npm run data
cp -r './TestData/' '../Model/data/'

#npm run cleandir
#npm run processdata
#npm run tokenize
#npm run generate_vocab
#python commonvocab.py 5000
fn='./DevData/' npm run data
cp -r './DevData/' '../Model/data/'

rm -rf './Vocab/'
npm run cleandir
