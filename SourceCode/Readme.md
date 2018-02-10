# Convert Source Code to AST and Tokens  
npm run tokenize  

# Convert AST to Code  
npm run generate  

# Generate mutations based on correct code  
n=[number of mutations] npm mutate 

# Create Training/Dev/Test Data from Tokens
npm run data  
Can set duplicated_allowed to filter training data for duplicate patterns  

# Generate Vocabulary from Training Data  
python commonvocab.py [vocab-size]

# Workflow  
Generate mutations for bug pattern => Tokenize and AST => Generate Vocab => Get Common Vocab => Training Data  

# Generate data and move to model dir    
./data.sh  
