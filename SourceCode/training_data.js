const fs = require("fs");
const rimraf = require('rimraf');
const pythonshell = require('python-shell');

const DataDir = "./TrainingData/";
const TokensCorrectDir = "./TokensCorrect/";
const TokensBuggyDir = "./TokensBuggy/";
const VocabText = './vocab.txt';

if(!fs.existsSync(TokensCorrectDir) || !fs.existsSync(TokensBuggyDir)){
        console.log("Please make sure you have Tokens.")
        process.exit(1);
}

if(fs.existsSync(DataDir)){
  rimraf.sync(DataDir);
}

fs.mkdirSync(DataDir);
fs.openSync(DataDir + 'examples.correct', 'w');
fs.openSync(DataDir + 'examples.buggy', 'w');

var options = {
  mode: 'text',
  args: ['20']
};

pythonshell.run('commonvocab.py', options, function (err, results) {
  if (err) throw err;
})

vocab = eval(fs.readFileSync(VocabText, 'utf8'));
console.log(vocab);

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

correct_files.forEach(function(file){
  var tokenCorrect = JSON.parse(fs.readFileSync(TokensCorrectDir + file, "utf-8"));
  var tokens = '';
  for(var i = 0; i < tokenCorrect.length; i++)
  {
    if(i != 0)
    {  
      tokens += ' ';
    }

    if(tokenCorrect[i].type.label === 'eof'){
      continue;
    }

    if(!tokenCorrect[i].value){
      tokens += tokenCorrect[i].type.label;
    }
    else
    {
      if(vocab.includes(tokenCorrect[i].value.toLowerCase()))
      {
        tokens += tokenCorrect[i].value;
      }
      else {
        tokens += tokenCorrect[i].type.label;
      }
    }
  }  
 
  fs.appendFileSync(DataDir + 'examples.correct', tokens + "\n");
});

buggy_files.forEach(function(file){
  var tokenBuggy = JSON.parse(fs.readFileSync(TokensBuggyDir + file, "utf-8"));
  
  var tokens = '';
  for(var i = 0; i < tokenBuggy.length; i++)
  {
    if(i != 0)
    {  
      tokens += ' ';
    }

    if(tokenBuggy[i].type.label === 'eof'){
      continue;
    }

    if(!tokenBuggy[i].value){
      tokens += tokenBuggy[i].type.label;
    }
    else
    {
      if(vocab.includes(tokenBuggy[i].value.toLowerCase()))
      {
        tokens += tokenBuggy[i].value;
      }
      else {
        tokens += tokenBuggy[i].type.label;
      }
    }
  }  

  fs.appendFileSync(DataDir + 'examples.buggy', tokens + "\n");
});
