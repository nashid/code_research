import sys
import nltk

vocab_size = int(sys.argv[1]);

input_file = open('./Vocab/Vocab.correct', 'r')
correct_corpus = input_file.read()
input_file = open('./Vocab/Vocab.buggy', 'r')
buggy_corpus = input_file.read()

code_corpus = correct_corpus + buggy_corpus;

allWords = nltk.tokenize.word_tokenize(code_corpus)
allWordDist = nltk.FreqDist(w for w in allWords)

mostCommon = allWordDist.most_common(vocab_size)
words = [i[0] for i in mostCommon if i[1] != 1]

output_file = open('./Vocab/vocab.txt', 'w')
output_file.write(str(words))
