'''
    Takes in a txt transcription file and returns a segmented txt file
    Model Reference: https://huggingface.co/BlueOrangeDigital/distilbert-cross-segment-document-chunking?text=Left+context.+%5BSEP%5D+Right+context.
'''
from transformers import (
    AutoModelForSequenceClassification,
    DistilBertTokenizer,
    TextClassificationPipeline
)

# model to be used for predicting similarity and difference scores for segmentation
model_name = "BlueOrangeDigital/distilbert-cross-segment-document-chunking"

id2label = {0: "SAME", 1: "DIFFERENT"}
label2id = {"SAME": 0, "DIFFERENT": 1}

tokenizer = DistilBertTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(
    model_name,
    num_labels=2,
    id2label=id2label,
    label2id=label2id
)

pipe = TextClassificationPipeline(model=model, tokenizer=tokenizer, return_all_scores=True)

def segment_paragraphs(text):
    # split text corups into paragraphs of two consecutive sentences.
    # Keep adding to the paragraphs while similarity score is greater than the difference score
    original_list = text.split('. ')
    merged_list = [original_list[i] + '. ' + original_list[i + 1] for i in range(0, len(original_list), 2)]

    paragraph = ""

    for item in merged_list:
        scores = pipe(item)
        similarity_score = scores[0][0]['score']
        difference_score = scores[0][1]['score']

        # print(similarity_score, difference_score)

        if similarity_score > difference_score:
            paragraph += item + '. '
        else:
            # start a new paragraph
            paragraph += '\n\t' + item + '. '
    return paragraph

# segment_paragraphs(generate_random_text())