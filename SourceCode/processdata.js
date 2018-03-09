const fs = require("fs");

const TrainSourceCorrectDir = "./TrainSourceCorrect/";
const TrainSourceBuggyDir = "./TrainSourceBuggy/";
const TestSourceCorrectDir = "./TestSourceCorrect/";
const TestSourceBuggyDir = "./TestSourceBuggy/";
const DevSourceCorrectDir = "./DevSourceCorrect/";
const DevSourceBuggyDir = "./DevSourceBuggy/";

var dirs = [TrainSourceCorrectDir, TrainSourceBuggyDir, TestSourceCorrectDir, TestSourceBuggyDir, DevSourceCorrectDir, DevSourceBuggyDir];

for(var i in dirs)
{
  var dir = dirs[i];
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
}

var dataset = fs.readFileSync("dataset.json");
var datasetJSON = JSON.parse(dataset);
var buggyTrain = []; 
var correctTrain = [];
var buggyTest = []; 
var correctTest = [];
var buggyDev = [];
var correctDev = [];

var examples = [correctTrain, buggyTrain, 
	correctTest, buggyTest, correctDev, buggyDev];
var devSplit = 10;


for(var i = 0; i< datasetJSON.length; i++)
{
  var isDevSet = i % 10 == 0;
  var isTrainSet = true;
  var changePairs = datasetJSON[i].sliceChangePair;
  for(var j = 0; j < changePairs.length; j++)
  {
    var changePair = changePairs[j];
    var before = changePair.before;
    var after = changePair.after; 
    var type = changePair.type;   
 
    if(type === "MUTANT_REPAIR")
    { 
      if(isDevSet)
      {
        buggyDev.push(before);
        correctDev.push(after);
        isTrainSet = false;
      }
      else
      {
        buggyTrain.push(before);
        correctTrain.push(after);
        isTrainSet = true;
      }
   }
    else if(type === "REPAIR")
    {
      buggyTest.push(before);
      correctTest.push(after);
      isTrainSet = false;
    }
    else 
    {
        if(isDevSet)
        {
          buggyDev.push(before);
          correctDev.push(after);
        }
 	else if(isTrainSet)
        {
          buggyTrain.push(before);
          correctTrain.push(after);  
	}
        else {
 	  buggyTest.push(before);
          correctTest.push(after);
	} 
    }
  }
}

for(var i = 0; i < examples.length; i++){
  var exampleSet = examples[i];
  var dir = dirs[i];
  for(var j = 0; j < exampleSet.length; j++){
    fs.writeFileSync(dir + j + '.js', exampleSet[j], function (err) {
	if (err) throw err;
	console.log('Processed ' + j + '.js' + ' in ' + dir);			});
  }
}
