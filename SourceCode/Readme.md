# Convert Source Code to AST and Tokens  
npm tokenize  

# Convert AST to Code  
npm generate  

# Generate mutations based on correct code  
n=[number of mutations] npm mutate 

# Create Training Data from Tokens
npm training_data  

# Generate Vocabulary from Training Data  
python commonvocab.py [vocab-size]

# Workflow  
Generate mutations for bug pattern => Tokenize and AST => Generate Vocab => Get Common Vocab => Training Data  
