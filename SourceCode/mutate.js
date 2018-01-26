const fs = require("fs");

const GeneratedSourceDir = "./GeneratedSource/";

function randomURL(){
  var slashes = Math.floor(Math.random() * 5) + 1;
  var url = "'" + '/';

  for(var i = 0; i < slashes; i++)
  {
    var partLength = Math.floor(Math.random() * 10) + 1;
    url += Math.random().toString(36).substr(partLength) + '/';
  }  
  
  return url + "'";
};

function randomData(){
  var data = {};

  var numProps = Math.floor(Math.random() * 5) + 1;
  var keys = [];
  var vals = [];  

  for(var i = 0; i < numProps; i++)
  {
    var keyLength = Math.floor(Math.random() * 10) + 1;
    keys.push(Math.random().toString(36).substr(keyLength));
    var valLength = Math.floor(Math.random() * 10) + 1;
    vals.push(Math.random().toString(36).substr(valLength));
  }

  for(var i = 0; i < keys.length; i++)
  {
    data[keys[i]] = vals[i];
  }

  return data;
}

if(!fs.existsSync(GeneratedSourceDir)){
  fs.mkdirSync(GeneratedSourceDir);
}

var mutationNum = process.env.n;

for(var i = 0; i < mutationNum; i++){
  var g_randomURL = randomURL();
  var g_randomData = randomData();

  var buggy = '$.ajax({' + '\n' +
      '\t' + 'url: ' + g_randomURL + ',\n' +
      '\t' + 'type: ' + "'" + 'PUT' + "'" + ',\n' +
      '\t' + 'data: ' + JSON.stringify(g_randomData) + ',\n' +
      '\t' + 'contentType: ' + "'" + 'application/json' + "'" + ',\n' +
      '\t' + 'dataType: ' + "'" + 'json' + "'" + '\n' +
  '});';  

 fs.writeFile(GeneratedSourceDir + 'buggy_' + i + '.js', buggy, function (err) {
   if (err) throw err;
   console.log('Generated buggy mutation ' + 'buggy_' + i + '.js');
 });

  var correct = '$.ajax({' + '\n' +
      '\t' + 'url: ' + g_randomURL + ',\n' +
      '\t' + 'type: ' + "'" + 'PUT' + "'" + ',\n' +
      '\t' + 'data: ' + 'JSON.stringify(' + JSON.stringify(g_randomData) + '),\n' +
      '\t' + 'contentType: ' + "'" + 'application/json' + "'" + ',\n' +
      '\t' + 'dataType: ' + "'" + 'json' + "'" + '\n' +
  '});';  

 fs.writeFile(GeneratedSourceDir + 'correct_' + i + '.js', correct, function (err) {
   if (err) throw err;
   console.log('Generated correct mutation ' + 'correct_' + i + '.js',);
 });

}
