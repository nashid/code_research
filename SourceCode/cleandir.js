const fs = require("fs");
const rimraf = require('rimraf');

const GeneratedSourceDir = "./GeneratedSource/";
const TranslatedDir = "./TranslatedCode/";
const ASTDir = "./ASTs/";
const TokenDir = "./Tokens/";

if(fs.existsSync(ASTDir)){
  rimraf.sync(ASTDir);
  console.log("Removed AST Dir \n");
}

if(fs.existsSync(TokenDir)){
  rimraf.sync(TokenDir);
  console.log("Removed Token Dir \n");
}

if(fs.existsSync(GeneratedSourceDir)){
  rimraf.sync(GeneratedSourceDir);
  console.log("Removed Generated Source Dir \n");
}

if(fs.existsSync(TranslatedDir)){
  rimraf.sync(TranslatedDir);
  console.log("Removed Translated Code Dir \n");
}


