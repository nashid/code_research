/* Tracks common vocab. */

const esprima = require("esprima");
const walk = require("estree-walk");
const TrieHeap = require("./trietree.js");

function Vocab (vocabSize) {

	let topvocab = new TrieHeap(vocabSize);

	/**
	 * Add the vocab from the AST to the vocab map.
	 */
	this.add = function(ast) {
		walk(ast, {
				Identifier: function(node, stop) { 
					topvocab.incrementWordCount(node.name);
				},
				Literal: function(node, stop) { 
					if(node.value === Object(node.value)) return; // Avoid RegEx
					topvocab.incrementWordCount(node.raw);
				}
			});
	}

	/**
	 * @return the vocabulary as a string.
	 */
	this.print = function() {
		topvocab.printHeap();
	}

	/**
	 * @return the top {@code count} entries in the vocab.
	 */
	this.getTopN = function(count) {
		let topN = new Set();
		topvocab.forEach(function (word) {
			topN.add(word);
		});
		return topN;
	}

}

function buildVocab(data, vocabSize) {

	let vocab = new Vocab(vocabSize);

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
