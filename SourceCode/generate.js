const fs = require("fs");
const escodegen = require("escodegen");
const rimraf = require('rimraf');

const SourceDir = "./Source/";
const ASTDir = "./ASTs/";
const GeneratedDir = "./GeneratedCode/";

if(!fs.existsSync(ASTDir)){
	console.log("Please make sure you have ASTs.")
	process.exit(1);
}

if(fs.existsSync(GeneratedDir)){
  rimraf.sync(GeneratedDir);
}

fs.mkdirSync(GeneratedDir);

var generated = [];
var files = fs.readdirSync(ASTDir);
files.forEach(file => {
    let name = file.slice(0, -8);
    generated.push(name);
});

generated.forEach(function(genfile){
  var ast = JSON.parse(fs.readFileSync(ASTDir + genfile + 'AST.json', "utf-8"));
  var code = escodegen.generate(ast);

  fs.writeFile(GeneratedDir + genfile + '_g.js', code, function (err) {
    if (err) throw err;
    console.log('Generated code from AST for file ' + genfile);
  });
});

