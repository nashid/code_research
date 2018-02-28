#!/bin/bash

rm -rf './data/nmt_model'

python -m nmt.nmt \
    --src=buggy --tgt=correct \
    --vocab_prefix=./data/Vocab/vocab  \
    --train_prefix=./data/TrainData/train \
    --dev_prefix=./data/DevData/dev  \
    --test_prefix=./data/TestData/test \
    --out_dir=./data/nmt_model \
    --encoder_type=bi \
    --optimizer=adam \
    --learning_rate=0.1
    --num_train_steps=1200 \
    --steps_per_stats=100 \
    --num_layers=2 \
    --num_units=128 \
    --dropout=0.2 \
    --metrics=bleu
