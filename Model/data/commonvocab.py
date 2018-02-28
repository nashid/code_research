import sys
import nltk

vocab_size = int(sys.argv[1]);
#special_words = ['name', 'string'];

input_file = open('./Vocab/VocabCorpus.correct', 'r')
correct_code_corpus = input_file.read()

allWords = nltk.tokenize.word_tokenize(correct_code_corpus)
allWordDist = nltk.FreqDist(w for w in allWords)
mostCommon = allWordDist.most_common(vocab_size)
words = [i[0] for i in mostCommon if i[1] > 1]
output_file = open('./Vocab/vocab.correct', 'w')
output_file.write(str(words))

input_file = open('./Vocab/VocabCorpus.buggy', 'r')
buggy_code_corpus = input_file.read()

allWords = nltk.tokenize.word_tokenize(buggy_code_corpus)
allWordDist = nltk.FreqDist(w for w in allWords)
mostCommon = allWordDist.most_common(vocab_size)
words = [i[0] for i in mostCommon if i[1] > 2]
output_file = open('./Vocab/vocab.buggy', 'w')
output_file.write(str(words))
