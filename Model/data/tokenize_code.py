import nltk

input_file = open('train.correct', 'r')
file_contents = input_file.read()
input_file.close()
train_tokens_list = nltk.word_tokenize(file_contents)

input_file = open('dev.correct', 'r')
file_contents = input_file.read()
input_file.close()
dev_tokens_list = nltk.word_tokenize(file_contents)

input_file = open('test.correct', 'r')
file_contents = input_file.read()
input_file.close()
test_tokens_list = nltk.word_tokenize(file_contents)

tokens_list = train_tokens_list + dev_tokens_list + test_tokens_list

file = open('vocab.correct', 'w')
unique_words = set(tokens_list)
for word in unique_words:
    file.write(str(word) + "\n")

file.close()

input_file = open('train.buggy', 'r')
file_contents = input_file.read()
input_file.close()
train_tokens_list = nltk.word_tokenize(file_contents)

input_file = open('dev.buggy', 'r')
file_contents = input_file.read()
input_file.close()
dev_tokens_list = nltk.word_tokenize(file_contents)

input_file = open('test.buggy', 'r')
file_contents = input_file.read()
input_file.close()
test_tokens_list = nltk.word_tokenize(file_contents)

tokens_list = train_tokens_list + dev_tokens_list + test_tokens_list

file = open('vocab.buggy', 'w')
unique_words = set(tokens_list)
for word in unique_words:
    file.write(str(word) + "\n")

file.close()
