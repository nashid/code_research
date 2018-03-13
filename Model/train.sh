#!/bin/bash

rm -rf './code_model'

python -m nmt.nmt \
    --src=buggy --tgt=correct \
    --vocab_prefix=./data/Vocab/vocab  \
    --train_prefix=./data/TrainData/train \
    --dev_prefix=./data/DevData/dev  \
    --test_prefix=./data/TestData/test \
    --out_dir=./nmt_model \
    #--encoder_type=bi \
    --optimizer=sgd \
    --learning_rate=0.3 \
    #--batch_size=1024 \
    --num_train_steps=12000 \
    --steps_per_stats=100 \
    --num_layers=1 \
    --num_units=1500 \
    --dropout=0.2 \
    --metrics=bleu
