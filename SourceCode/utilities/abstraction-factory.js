
const fs = require("fs");
const esprima = require("esprima");
const applyDepthAbstraction = require("./depth-abstraction.js");
const applyVocabAbstraction = require("./vocab-abstraction.js"); const escodegen = require("escodegen");

function Abstraction () {

	let pairs = [];

	/**
	 * Add the abstracted code
	 */
	this.add = function(before, after) {
		pairs.push({ before: before, after: after });
	}

	/**
	 * Build the NMT sequence files.
	 */
	this.nmtseq = function(seqOut, vocabOut) {

		let vocab = new Set();

		/* Clean old files. */
		if (!fs.existsSync("output"))
			fs.mkdirSync("output");
		fs.writeFile("sequences.buggy", '');
		fs.writeFile("sequences.correct", '');
		fs.writeFile("vocab", '');

		/* Generate the new sequence files. */
		for(let i = 0; i < pairs.length; i++) {
			console.log(pairs[i].before);
			console.log(pairs[i].after);
			beforeAST = esprima.parse(pairs[i].before, { tokens: true });
			afterAST = esprima.parse(pairs[i].after, { tokens: true });
			fs.appendFileSync("output/training.buggy", tokens2Sequence(beforeAST.tokens, vocab));
			fs.appendFileSync("output/training.correct", tokens2Sequence(afterAST.tokens, vocab));
		}

		/* Generate the new vocab files. */
		vocab.forEach(function (token) {
			fs.appendFileSync("output/vocab", token + "\n");
		});

	}

	/**
	 * @return the abstracted code as a string.
	 */
	this.print = function() {
		for(let i = 0; i < pairs.length; i++) {
			console.log(pairs[i].before);
			console.log(pairs[i].after);
		}
	}

	function tokens2Sequence(tokens, vocab) {
		let sequence = [];
		for(let i = 0; i < tokens.length; i++) {
			let token = tokens[i].value.replace("__abs__", "@");
			sequence.push(token);
			vocab.add(token);
		}
		return sequence.join(" ");
	}

}

/**
 * Helper function for checking if the AST includes one function.
 */
function isFunctionAnalysis(ast) {
	return ast.body.length === 1 && ast.body[0].type === 'FunctionDeclaration';
}

function buildAbstractSequenceSet(data, topN) {

	let abstraction = new Abstraction();

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
				FunctionDeclaration: { type: 'Identifier', name: '__abs__function' },
				FunctionExpression: { type: 'Identifier', name: '__abs__function' },
				ObjectExpression: { type: 'Identifier', name: '__abs__objectlit' }
			}, abstractionDepth)
			applyDepthAbstraction(afterAST, {
				FunctionDeclaration: { type: 'Identifier', name: '__abs__function' },
				FunctionExpression: { type: 'Identifier', name: '__abs__function' },
				ObjectExpression: { type: 'Identifier', name: '__abs__objectlit' }
			}, abstractionDepth)

			/* Abstract terms not in the vocabulary. */
			applyVocabAbstraction(beforeAST, topN);
			applyVocabAbstraction(afterAST, topN);

			let beforeCode = escodegen.generate(beforeAST);
			let afterCode = escodegen.generate(afterAST);

			/* Store the abstracted code. */
			abstraction.add(beforeCode, afterCode);

		}

	}

	/* Let's see what we've got. */
	//abstraction.print();

	return abstraction;

}

module.exports = {
	build: buildAbstractSequenceSet,
}
