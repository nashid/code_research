#!/bin/bash
npm run cleandir
n=1000 npm run mutate
npm run tokenize
npm run generate_vocab
python commonvocab.py 20
fn='./TrainingData/' npm run training_data
cp -r './TrainingData/' '../Model/data/'

n=100 npm run mutate
npm run tokenize
npm run generate_vocab
python commonvocab.py 20
fn='./TestData/' npm run training_data
cp -r './TestData/' '../Model/data/'

n=100 npm run mutate
npm run tokenize
npm run generate_vocab
python commonvocab.py 20
fn='./DevData/' npm run training_data
cp -r './DevData/' '../Model/data/'


