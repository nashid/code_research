const fs = require("fs");
const escodegen = require("escodegen");
const rimraf = require('rimraf');

const ASTCorrectDir = "./ASTsCorrect/";
const ASTBuggyDir = "./ASTsBuggy/";
const TranslatedCodeDir = "./TranslatedCode/";

if(!fs.existsSync(ASTDir)){
	console.log("Please make sure you have ASTs.")
	process.exit(1);
}

if(fs.existsSync(TranslatedCodeDir)){
  rimraf.sync(TranslatedCodeDir);
}

fs.mkdirSync(TranslatedCodeDir);

var translated = [];
var files = fs.readdirSync(ASTCorrectDir);
files.forEach(file => {
    let name = file.slice(0, -8);
    translated.push(name);
});

translated.forEach(function(translateFile){
  var ast = JSON.parse(fs.readFileSync(ASTDir + translateFile + 'AST.json', "utf-8"));
  var code = escodegen.generate(ast);

  fs.writeFile(TranslatedCodeDir + translateFile + 'Translated.js', code, function (err) {
    if (err) throw err;
    console.log('Translated code from AST for file ' + translateFile);
  });
});
