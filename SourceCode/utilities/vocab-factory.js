/* Tracks common vocab. */

const esprima = require("esprima");
const walk = require("estree-walk");

function Vocab () {

	let vocab = new Map();

	/**
	 * Add the vocab from the AST to the vocab map.
	 */
	this.add = function(ast) {
		console.log("Adding AST to vocabulary...");	

		walk(ast, {
				Identifier: function(node, stop) { 
					let count = vocab.get(node.name);
					if(count) vocab.set(node.name, count + 1);
					else vocab.set(node.name, 1);
				},
				Literal: function(node, stop) { 
					if(node.value === Object(node.value)) return; // Avoid RegEx
					let count = vocab.get(node.raw);
					if(count) vocab.set(node.raw, count + 1);
					else vocab.set(node.raw, 1);
				}
			});
	}

	/**
	 * @return the vocabulary as a string.
	 */
	this.print = function() {
		console.log(vocab);	
	}

	/**
	 * @return the top {@code count} entries in the vocab.
	 */
	this.getTopN = function(count) {
		let topN = new Set();
		vocab.forEach(function (value, key) {
			if(value >= count) topN.add(key);
		});
		return topN;
	}

}

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

module.exports = {
	build: buildVocab
}
