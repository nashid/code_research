import sys
import nltk
import io

vocab_size = int(sys.argv[1]);

input_file = io.open('./Vocab/VocabCorpus.correct', mode='r', encoding="utf-8")
correct_code_corpus = input_file.read()

allWords = nltk.tokenize.word_tokenize(correct_code_corpus)
allWordDist = nltk.FreqDist(w for w in allWords)
mostCommon = allWordDist.most_common(vocab_size)
words = [i[0] for i in mostCommon if i[1] != 1]
output_file = open('./Vocab/vocab.correct', 'w')
output_file.write(str(words))

input_file = io.open('./Vocab/VocabCorpus.buggy', mode='r', encoding="utf-8")
buggy_code_corpus = input_file.read()

allWords = nltk.tokenize.word_tokenize(buggy_code_corpus)
allWordDist = nltk.FreqDist(w for w in allWords)
mostCommon = allWordDist.most_common(vocab_size)
words = [i[0] for i in mostCommon if i[1] > 2]
output_file = open('./Vocab/vocab.buggy', 'w')
output_file.write(str(words))
