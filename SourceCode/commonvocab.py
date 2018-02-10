import sys
import nltk

vocab_size = int(sys.argv[1]);

input_file = open('TrainingData/examples.correct', 'r')
file_corpus = input_file.read()

allWords = nltk.tokenize.word_tokenize(file_corpus)
allWordDist = nltk.FreqDist(w.lower() for w in allWords)

mostCommon = allWordDist.most_common(vocab_size)
words = [i[0] for i in mostCommon]

output_file = open('vocab.txt', 'w')
output_file.write(str(words))
