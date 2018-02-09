python -m nmt.nmt \
    --src=buggy --tgt=correct \
    --vocab_prefix=./data/vocab  \
    --train_prefix=./data/train \
    --dev_prefix=./data/dev  \
    --test_prefix=./data/test \
    --out_dir=./data/nmt_model \
    --num_train_steps=200 \
    --steps_per_stats=50 \
    --num_layers=2 \
    --num_units=128 \
    --dropout=0.2 \
    --metrics=bleu

python -m nmt.nmt \
    --out_dir=./data/nmt_model \
    --inference_input_file=./data/code_infer.buggy \
    --inference_output_file=./data/nmt_model/code_output
