Features of StudyWave AI

Flow:
1. get video transcription.
2. transcription is then segmented.
3. Mcqs and topics are then generated for each paragraph.
4. transcription and segmentation api will run on local servers while mcqs and topic apis will work on colab servers, 
    their api links will be made public and used through ngrok. (Version 1 - discarded)

Versions:
1. Version 0 used Simple-t5 transformers for mcq generation.
2. Version 1 of the AI backend used FALCON-7B model for quiz generation and topic modelling.
3. Version 2 of the AI backend uses OpenAI gpt3.5-turbo model for quiz generation.