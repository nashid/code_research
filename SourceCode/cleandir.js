const fs = require("fs");
const rimraf = require('rimraf');

const GeneratedSourceBuggyDir = "./GeneratedSourceBuggy/";
const GeneratedSourceCorrectDir = "./GeneratedSourceCorrect/";

const TranslatedDir = "./TranslatedCode/";
const VocabDir = './Vocab/';

const ASTBuggyDir = "./ASTsBuggy/";
const ASTCorrectDir = "./ASTsCorrect/";

const TokenBuggyDir = "./TokensBuggy/";
const TokenCorrectDir = "./TokensCorrect/";

const TrainingData = "./TrainingData/"

if(fs.existsSync(ASTBuggyDir)){
  rimraf.sync(ASTBuggyDir);
  console.log("Removed AST Buggy Dir \n");
}

if(fs.existsSync(ASTCorrectDir)){
  rimraf.sync(ASTCorrectDir);
  console.log("Removed AST Correct Dir \n");
}

if(fs.existsSync(TokenBuggyDir)){
  rimraf.sync(TokenBuggyDir);
  console.log("Removed Token Buggy Dir \n");
}

if(fs.existsSync(TokenCorrectDir)){
  rimraf.sync(TokenCorrectDir);
  console.log("Removed Token Correct Dir \n");
}

if(fs.existsSync(GeneratedSourceBuggyDir)){
  rimraf.sync(GeneratedSourceBuggyDir);
  console.log("Removed Generated Source Buggy Dir \n");
}

if(fs.existsSync(GeneratedSourceCorrectDir)){
  rimraf.sync(GeneratedSourceCorrectDir);
  console.log("Removed Generated Source Correct Dir \n");
}

if(fs.existsSync(TranslatedDir)){
  rimraf.sync(TranslatedDir);
  console.log("Removed Translated Code Dir \n");
}

if(fs.existsSync(VocabDir)){
  rimraf.sync(VocabDir);
  console.log("Removed Vocab Dir \n");
}

if(fs.existsSync(TrainingData)){
  rimraf.sync(TrainingData);
  console.log("Removed Training Examples Dir \n");
}



