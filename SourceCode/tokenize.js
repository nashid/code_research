const fs = require("fs");
const acorn = require("acorn");
const rimraf = require('rimraf');

const SourceDir = "./Source/";
const ASTDir = "./ASTs/";
const TokenDir = "./Tokens/";

if(!fs.existsSync(SourceDir)){
  console.log("Please make sure you have source files to tokenize.");
  process.exit(1);
}

if(fs.existsSync(ASTDir)){
  rimraf.sync(ASTDir);
}

if(fs.existsSync(TokenDir)){
  rimraf.sync(TokenDir);
}

fs.mkdirSync(ASTDir);
fs.mkdirSync(TokenDir);

var sources = [];
var files = fs.readdirSync(SourceDir);
files.forEach(file => {
    let name = file.slice(0, -3);
    sources.push(name);
});

sources.forEach(function(source){
    var text = fs.readFileSync(SourceDir + source + ".js", "utf-8");
    var tokens = []; 
    var ast = acorn.parse(text, {
       onToken: tokens
    });

    fs.writeFile(ASTDir + source + "AST.json", JSON.stringify(ast, null, 2), function (err) {
	    if (err) throw err;
	    console.log('Created AST for file ' + source);
	    });

    fs.writeFile(TokenDir + source + "Tokens.json", JSON.stringify(tokens, null, 2), function (err) {
	    if (err) throw err;
	    console.log('Created tokens for file ' + source);
	    });
});
