const fs = require('fs');

const VocabBuggy = './Vocab/vocab.buggy';
const VocabCorrect = './Vocab/vocab.correct';

vocab_buggy = eval(fs.readFileSync(VocabBuggy, 'utf8'));
vocab_correct = eval(fs.readFileSync(VocabCorrect, 'utf8'));

// Format vocab for model  
fs.unlinkSync(VocabBuggy);
fs.writeFileSync(VocabBuggy, '');
vocab_buggy.forEach(function(vocab) {
  fs.appendFileSync(VocabBuggy, vocab + "\n");
});

fs.unlinkSync(VocabCorrect);
fs.writeFileSync(VocabCorrect, '');
vocab_correct.forEach(function(vocab) {
  fs.appendFileSync(VocabCorrect, vocab + "\n");
});
