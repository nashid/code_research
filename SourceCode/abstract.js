/**
 * abstract.js
 * A tool for abstracting away elements of a function's AST.
 */

const util = require("util");
const fs = require("fs");
const esprima = require("esprima");
const esabstraction = require("./utilities/estree-abstraction.js");
const Vocab = require("./utilities/estree-vocab.js");
const esapplyvocab = require("./utilities/estree-applyvocab.js");
const escodegen = require("escodegen");

/**
 * Helper function for checking if the AST includes one function.
 */
function isFunctionAnalysis(ast) {
	return ast.body.length === 1 && ast.body[0].type === 'FunctionDeclaration';
}

/* Read the sequence pairs from JSON. */
let jsonFile = process.argv[2];
if(!fs.existsSync(jsonFile)) {
  console.log("Usage: node abstract.js [sequences.js]");
  process.exit(1);
}
let data = JSON.parse(fs.readFileSync(jsonFile)).data;

let vocab = buildVocab(data);
buildAbstractSequenceSet(data, vocab.getTopN(5));

/* *****************
 * Helper functions. 
 * *****************/

function buildVocab(data) {

	let vocab = new Vocab();

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

			vocab.add(afterAST);

		}

	}

	return vocab;

}

function buildAbstractSequenceSet(data, topN) {

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

			/* Set the abstraction depth. */
			let abstractionDepth = 0;
			if(isFunctionAnalysis(beforeAST) && isFunctionAnalysis(afterAST)) {
				abstractionDepth = 1;
			}

			/* Abstract nested functions and object literals. */
			esabstraction(beforeAST, {
				FunctionDeclaration: { type: 'Identifier', name: '@function' },
				FunctionExpression: { type: 'Identifier', name: '@function' },
				ObjectExpression: { type: 'Identifier', name: '@objectlit' }
			}, abstractionDepth)
			esabstraction(afterAST, {
				FunctionDeclaration: { type: 'Identifier', name: '@function' },
				FunctionExpression: { type: 'Identifier', name: '@function' },
				ObjectExpression: { type: 'Identifier', name: '@objectlit' }
			}, abstractionDepth)

			/* Abstract terms not in the vocabulary. */
			esapplyvocab(beforeAST, topN);
			esapplyvocab(afterAST, topN);

			let beforeCode = escodegen.generate(beforeAST);
			let afterCode = escodegen.generate(afterAST);

			/* Let's see what we've got. */
			console.log(beforeCode);
			console.log(afterCode);

		}

	}

}
