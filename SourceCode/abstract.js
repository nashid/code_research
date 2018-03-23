/**
 * abstract.js
 * A tool for abstracting away elements of a function's AST.
 */

const util = require("util");
const fs = require("fs");
const esprima = require("esprima");
const esabstraction = require("./utilities/estree-abstraction.js");
const escodegen = require("escodegen");

/* Read the sequence pairs from JSON. */
let jsonFile = process.argv[2];
if(!fs.existsSync(jsonFile)) {
  console.log("Usage: node abstract.js [sequences.js]");
  process.exit(1);
}
let data = JSON.parse(fs.readFileSync(jsonFile)).data;

/* Iterate through the source code file changes. */
for(let i = 0; i < data.length; i++) {
	let sourceChange = data[i];

	/* Iterate through nominal/repair sequence pairs. */
	for(let j = 0; j < sourceChange.sliceChangePair.length; j++) {

		let pair = sourceChange.sliceChangePair[j];

    let beforeAST = null;
    let afterAST = null;

		try {
			beforeAST = esprima.parse(pair.before);
			afterAST = esprima.parse(pair.after);
		} catch (e) {
			continue; // Skip stuff that can't be parsed.
		}

		/* Visit the nodes in the AST. */
		esabstraction(beforeAST, {
			FunctionDeclaration: { type: 'Identifier', name: '@function' },
			FunctionExpression: { type: 'Identifier', name: '@function' },
			ObjectExpression: { type: 'Identifier', name: '@objectlit' }
		}, 1)
		esabstraction(afterAST, {
			FunctionDeclaration: { type: 'Identifier', name: '@function' },
			FunctionExpression: { type: 'Identifier', name: '@function' },
			ObjectExpression: { type: 'Identifier', name: '@objectlit' }
		}, 1)

		let beforeCode = escodegen.generate(beforeAST);
		let afterCode = escodegen.generate(afterAST);
		console.log(beforeCode);
		console.log(afterCode);
		//console.log(JSON.stringify(afterAST, null, 4));

	}

}
