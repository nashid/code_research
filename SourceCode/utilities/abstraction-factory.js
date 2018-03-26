
const fs = require("fs");
const esprima = require("esprima");
const applyDepthAbstraction = require("./depth-abstraction.js");
const applyVocabAbstraction = require("./vocab-abstraction.js");
const escodegen = require("escodegen");

/**
 * Helper function for checking if the AST includes one function.
 */
function isFunctionAnalysis(ast) {
	return ast.body.length === 1 && ast.body[0].type === 'FunctionDeclaration';
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
			applyDepthAbstraction(beforeAST, {
				FunctionDeclaration: { type: 'Identifier', name: '@function' },
				FunctionExpression: { type: 'Identifier', name: '@function' },
				ObjectExpression: { type: 'Identifier', name: '@objectlit' }
			}, abstractionDepth)
			applyDepthAbstraction(afterAST, {
				FunctionDeclaration: { type: 'Identifier', name: '@function' },
				FunctionExpression: { type: 'Identifier', name: '@function' },
				ObjectExpression: { type: 'Identifier', name: '@objectlit' }
			}, abstractionDepth)

			/* Abstract terms not in the vocabulary. */
			applyVocabAbstraction(beforeAST, topN);
			applyVocabAbstraction(afterAST, topN);

			let beforeCode = escodegen.generate(beforeAST);
			let afterCode = escodegen.generate(afterAST);

			/* Let's see what we've got. */
			console.log(beforeCode);
			console.log(afterCode);

		}

	}

}

module.exports = {
	buildAbstractSequenceSet: buildAbstractSequenceSet
}
