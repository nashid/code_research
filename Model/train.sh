#!/bin/bash

python -m nmt.nmt \
    --attention=scaled_luong \
    --src=buggy --tgt=correct \
    --vocab_prefix=./data/vocab  \
    --train_prefix=./data/train \
    --dev_prefix=./data/dev  \
    --test_prefix=./data/test \
    --out_dir=./data/nmt_model \
    --num_train_steps=1000 \
    --steps_per_stats=100 \
    --num_layers=2 \
    --num_units=128 \
    --dropout=0.2 \
    --metrics=bleu
