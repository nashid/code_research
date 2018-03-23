/* Tracks common vocab. */

const esprima = require("esprima");
const walk = require("estree-walk");

function Vocab (){

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
		let topN = [];
		vocab.forEach(function (value, key) {
			if(value >= count) topN.push(key);
		});
		return topN;
	}

}

module.exports = Vocab;
