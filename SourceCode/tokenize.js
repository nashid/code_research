const fs = require("fs");
const acorn = require("acorn");
const rimraf = require('rimraf');

const GeneratedSourceBuggyDir = "./GeneratedSourceBuggy/";
const GeneratedSourceCorrectDir = "./GeneratedSourceCorrect/";

const ASTBuggyDir = "./ASTsBuggy/";
const TokenBuggyDir = "./TokensBuggy/";
const ASTCorrectDir = "./ASTsCorrect/";
const TokenCorrectDir = "./TokensCorrect/";

if(!fs.existsSync(GeneratedSourceBuggyDir) || !fs.existsSync(GeneratedSourceCorrectDir)){
  console.log("Please make sure you have source files to tokenize.");
  process.exit(1);
}

if(fs.existsSync(ASTBuggyDir)){
  rimraf.sync(ASTBuggyDir);
}

if(fs.existsSync(TokenBuggyDir)){
  rimraf.sync(TokenBuggyDir);
}

if(fs.existsSync(ASTCorrectDir)){
  rimraf.sync(ASTCorrectDir);
}

if(fs.existsSync(TokenCorrectDir)){
  rimraf.sync(TokenCorrectDir);
}

fs.mkdirSync(ASTBuggyDir);
fs.mkdirSync(TokenBuggyDir);
fs.mkdirSync(ASTCorrectDir);
fs.mkdirSync(TokenCorrectDir);

var sources = [];
var files = fs.readdirSync(GeneratedSourceBuggyDir);
files.forEach(file => {
    let name = file.slice(0, -3);
    sources.push(name);
});

sources.forEach(function(source){
    var text = fs.readFileSync(GeneratedSourceBuggyDir + source + ".js", "utf-8");
    var tokens = [];
    var ast;
    try
    {
      ast = acorn.parse(text, {
       onToken: tokens
      });
    }
    catch(err)
    {
	return;
    }

//    var ast = acorn.parse(text, {
//       onToken: tokens
//    });

    fs.writeFileSync(ASTBuggyDir + source + "_AST.json", JSON.stringify(ast, null, 2), function (err) {
	    if (err)throw err;
	    console.log('Created AST for file ' + source);
	    });

    fs.writeFileSync(TokenBuggyDir + source + "_Tokens.json", JSON.stringify(tokens, null, 2), function (err) {
	    if (err) throw err;
	    console.log('Created tokens for file ' + source);
	    });
});

sources = [];
files = fs.readdirSync(GeneratedSourceCorrectDir);
files.forEach(file => {
    let name = file.slice(0, -3);
    sources.push(name);
});

sources.forEach(function(source){
    var text = fs.readFileSync(GeneratedSourceCorrectDir + source + ".js", "utf-8");
    var tokens = []; 
    var ast;
    try
    {
      ast = acorn.parse(text, {
       onToken: tokens
      });
    }
    catch(err)
    {
	return;
    }

//    var ast = acorn.parse(text, {
//       onToken: tokens
//    });

    fs.writeFileSync(ASTCorrectDir + source + "_AST.json", JSON.stringify(ast, null, 2), function (err) {
	    if (err) throw err;
	    console.log('Created AST for file ' + source);
	    });

    fs.writeFileSync(TokenCorrectDir + source + "_Tokens.json", JSON.stringify(tokens, null, 2), function (err) {
	    if (err) throw err;
	    console.log('Created tokens for file ' + source);
	    });
});
