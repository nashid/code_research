const fs = require("fs");
const rimraf = require('rimraf');

const DataDir = "./TrainingData/";
const TokensCorrectDir = "./TokensCorrect/";
const TokensBuggyDir = "./TokensBuggy/";

if(!fs.existsSync(TokensCorrectDir) || !fs.existsSync(TokensBuggyDir)){
        console.log("Please make sure you have Tokens.")
        process.exit(1);
}

if(fs.existsSync(DataDir)){
  rimraf.sync(DataDir);
}

fs.mkdirSync(DataDir);

var correct_examples = [];
var correct_files = fs.readdirSync(TokensCorrectDir);
correct_files.forEach(file => {
    let name = file.slice(0, -8);
    correct_examples.push(name);
});

var buggy_examples = [];
var buggy_files = fs.readdirSync(TokensBuggyDir);
buggy_files.forEach(file => {
    let name = file.slice(0, -8);
    buggy_examples.push(name);
});

//TODO write to single buggy file, write to single correct file examples are kept in order
correct_files.forEach(function(file){
  var tokenCorrect = JSON.parse(fs.readFileSync(TokensCorrectDir + file, "utf-8"));
  fs.appendFileSync(DataDir + 'examples.correct', JSON.stringify(tokenCorrect, null, 2) + "\n");
});

buggy_files.forEach(function(file){
  var tokenBuggy = JSON.parse(fs.readFileSync(TokensBuggyDir + file, "utf-8"));
  fs.appendFileSync(DataDir + 'examples.buggy', JSON.stringify(tokenBuggy, null, 2) + "\n");
});
