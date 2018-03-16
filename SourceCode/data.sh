#!/bin/bash

rm -rf '../Model/data/TrainData/'
rm -rf '../Model/data/TestData/'
rm -rf '../Model/data/DevData/'
rm -rf '../Model/data/Vocab'

npm run cleandir
npm run processdata
npm run tokenize
npm run generate_vocab
python commonvocab.py 150 
cp -r './Vocab' '../Model/data/'

fn='./TrainData/' correctDir='TokensTrainCorrect/' buggyDir='TokensTrainBuggy/' npm run data
cp -r './TrainData/' '../Model/data/'

fn='./TestData/' correctDir='TokensTestCorrect/' buggyDir='TokensTestBuggy/' npm run data
cp -r './TestData/' '../Model/data/'

fn='./DevData/' correctDir='TokensDevCorrect/' buggyDir='TokensDevBuggy/' npm run data
cp -r './DevData/' '../Model/data/'

rm -rf './Vocab/'
npm run cleandir
