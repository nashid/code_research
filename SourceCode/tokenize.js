const fs = require("fs");
const acorn = require("acorn");
const rimraf = require('rimraf');

const TrainSourceCorrectDir = "./TrainSourceCorrect/";
const TrainSourceBuggyDir = "./TrainSourceBuggy/";
const TestSourceCorrectDir = "./TestSourceCorrect/";
const TestSourceBuggyDir = "./TestSourceBuggy/";
const DevSourceCorrectDir = "./DevSourceCorrect/";
const DevSourceBuggyDir = "./DevSourceBuggy/";

var code_sources = [TrainSourceCorrectDir, TrainSourceBuggyDir, TestSourceCorrectDir, TestSourceBuggyDir, DevSourceCorrectDir, DevSourceBuggyDir];

const TrainASTBuggyDir = "./ASTsTrainBuggy/";
const TrainTokenBuggyDir = "./TokensTrainBuggy/";
const TrainASTCorrectDir = "./ASTsTrainCorrect/";
const TrainTokenCorrectDir = "./TokensTrainCorrect/";
const TestASTBuggyDir = "./ASTsTestBuggy/";
const TestTokenBuggyDir = "./TokensTestBuggy/";
const TestASTCorrectDir = "./ASTsTestCorrect/";
const TestTokenCorrectDir = "./TokensTestCorrect/";
const DevASTBuggyDir = "./ASTsDevBuggy/";
const DevTokenBuggyDir = "./TokensDevBuggy/";
const DevASTCorrectDir = "./ASTsDevCorrect/";
const DevTokenCorrectDir = "./TokensDevCorrect/";

var astList = [TrainASTCorrectDir, TrainASTBuggyDir, TestASTCorrectDir, TestASTBuggyDir, DevASTCorrectDir, DevASTBuggyDir];
var tokenList = [TrainTokenCorrectDir, TrainTokenBuggyDir, TestTokenCorrectDir, TestTokenBuggyDir, DevTokenCorrectDir, DevTokenBuggyDir];

for(var i in astList)
{
	if(fs.existsSync(astList[i])){
		rimraf.sync(astList[i]);
	}
}

for(var i in astList)
{
	fs.mkdirSync(astList[i]);
}

for(var i in tokenList)
{
	if(fs.existsSync(tokenList[i])){
		rimraf.sync(tokenList[i]);
	}
}

for(var i in tokenList)
{
	fs.mkdirSync(tokenList[i]);
}


for(var i in code_sources) {
	var code_dir = code_sources[i];
	var sources = [];
	var files = fs.readdirSync(code_dir);
	files.forEach(file => {
			let name = file.slice(0, -3);
			sources.push(name);
			});

	sources.forEach(process);
}

function process(source){
	var text = fs.readFileSync(code_dir + source + ".js", "utf-8");
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
	//skipping unparsable react elements
	return;
}

fs.writeFileSync(astList[i] + source + "_AST.json", JSON.stringify(ast, null, 2), function (err) {
		if (err)throw err;
		console.log('Created AST for file ' + source);
		});

var ftokens = abstractFunctions(tokens);
fs.writeFileSync(tokenList[i] + source + "_Tokens.json", JSON.stringify(ftokens, null, 2), function (err) {
		if (err) throw err;
		console.log('Created tokens for file ' + source);
		});
}

function abstractFunctions(utokens)
{
	var intervals = [];
loop1:
	for(var i = 0; i < utokens.length; i++)
	{
		if(utokens[i].type.label === "function"){
loop2:                       
			for(var j = 0; j < intervals.length; j++)
			{
				if(intervals[j].start < utokens[j].start
						&& intervals[j].end > utokens[j].end)
				{
					break loop2;
				}

			}
			intervals.push({'start': utokens[j].start, 'end': utokens[j].end });
		}
	}

	var ftokens = utokens;
	for(var i = 0; i < intervals.length; i++)
	{
		var length = utokens.length;    
		var tokensB = utokens.slice(0, intervals[i].start);
		var tokensA = utokens.slice(intervals[i].end + 1, length);
		var tokens = tokensB.concat(tokensA);
		ftokens = tokens;	 
	}

	return ftokens;
}
