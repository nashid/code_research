const fs = require("fs");

const GeneratedSourceCorrectDir = "./GeneratedSourceCorrect/";
const GeneratedSourceBuggyDir = "./GeneratedSourceBuggy/";

if(!fs.existsSync(GeneratedSourceBuggyDir)){
  fs.mkdirSync(GeneratedSourceBuggyDir);
}

if(!fs.existsSync(GeneratedSourceCorrectDir)){
  fs.mkdirSync(GeneratedSourceCorrectDir);
}

var dataset = fs.readFileSync("dataset.json");
var datasetJSON = JSON.parse(dataset);
var buggy = [];
var correct = [];

for(var i = 0; i< datasetJSON.length; i++)
{
  var changePairs = datasetJSON[i].sliceChangePair;
  for(var j = 0; j < changePairs.length; j++)
  {
    var changePair = changePairs[j];
    var before = changePair.before;
    var after = changePair.after; 
 
    buggy.push(before);
    correct.push(after);
  }
}

for(var i = 0; i < buggy.length; i++)
{
	fs.writeFileSync(GeneratedSourceBuggyDir + 'buggy_' + i + '.js', buggy[i], function (err) {
			if (err) throw err;
			console.log('Processed bug' + 'buggy_' + i + '.js');
			});

}

for(var i = 0; i < correct.length; i++)
{ 
	fs.writeFileSync(GeneratedSourceCorrectDir + 'correct_' + i + '.js', correct[i], function (err) {
			if (err) throw err;
			console.log('Processed correct' + 'correct_' + i + '.js',);
			});
}
