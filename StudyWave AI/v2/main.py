import json
import os
import traceback
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from fastapi import FastAPI, File, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from segmentation import segment_paragraphs

from openai import OpenAI
from dotenv import load_dotenv

from utils import get_heading

load_dotenv()

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

# Create an instance of the FastAPI class
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific origins if needed
    allow_credentials=True,
    allow_methods=["*"],  # You can specify specific methods (e.g., ["GET", "POST"])
    allow_headers=["*"],  # You can specify specific headers if needed
)

# Define a route using a decorator
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    url = str(request.base_url) + 'docs'

    return f"""
<HTML>
    <h1>Study Wave AI Backend</h1>
    <a href="{url}">View Documentation</a>
</HTML>
"""

@app.post("/transcribe/")
async def get_transcription(file: UploadFile):
    '''
        generates transcript of the video and automatically segments into paragraphs and adds topics to 
        the videos
    '''
    # Write file to disk. This simulates some business logic that results in a file sotred on disk
    with open(file.filename, 'wb') as disk_file:
        file_bytes = await file.read()

        disk_file.write(file_bytes)

        print(f"Received file named {file.filename} containing {len(file_bytes)} bytes. ")

    client = OpenAI(api_key=OPENAI_API_KEY)

    audio_file = open(file.filename, "rb")
    transcription = client.audio.transcriptions.create(
    model="whisper-1", 
    file=audio_file
    )

    text = transcription.text

    paragraphs = segment_paragraphs(text)
    # return paragraphs
    res = ""
    headings = []

    print('Adding Titles to Transcript...')
    # get heading
    for paragraph in paragraphs.split('\n\t'):
        heading = get_heading(paragraph)
        headings.append(heading)
        res += f"{heading}\n{paragraph}\n\n"

    return res # original, uncomment this
    
    
    # try:
    #     # Generate random text data
    #     # random_text = generate_random_text()

    #     print('Generating Transcript...')
    #     text = whisper_transcribe(model, request.path)

    #     print('Segmenting Transcript...')
    #     paragraphs = segment_paragraphs(text)
    #     # return paragraphs
    #     res = ""
    #     headings = []

    #     print('Adding Titles to Transcript...')
    #     # get heading
    #     for paragraph in paragraphs.split('\n\t'):
    #         heading = get_heading(paragraph)
    #         headings.append(heading)
    #         res += f"{heading}\n{paragraph}\n\n"

    #     # return res # original, uncomment this
    #     return final_transcript() # hard coded, comment this

    # except Exception as e:
    #     print("error", str(e))
    #     return final_transcript() # hard coded comment this
    #     # return {"error": str(e)}

# class Transcript(BaseModel):
#     text: str

# @app.post('/generate-mcqs/')
# # async def generate_mcqs():
# async def generate_mcqs(file: UploadFile = File(...)):
#     try:
#         content_bytes = await file.read()

#         # Decode the bytes to a str using the appropriate encoding (e.g., 'utf-8')
#         content = content_bytes.decode('utf-8')
        
#         # text = "Question 2: \"what is an example of a supervised learning algorithm?\"\na. Artificial Neural Networks (ANNs)\nb. Decision Trees*\nc. Linear Regression\nd. Random Forest\n\nQuestion 3: \"Can an unsupervised learning algorithm be used to predict text labels?\"\na. No (Incorrect)\nb. Yes\nc. *It depends on the specific use case\nd. Maybe  You are an intelligent chatbot. Based on the information provided in the paragraph below, generate three multiple-choice questions (MCQs) that test the user's understanding and critical thinking. Ensure that the questions challenge the user's knowledge and comprehension of the material and avoid creating trivial or overly obvious questions.In supervised learning, we're trying to build a model to predict an answer or label provided by a teacher. In unsupervised learning, instead of a teacher, the world around us is basically providing training labels. For example, if I freeze this video of a tennis ball right now, can you draw what could be the next frame? Unsupervised learning is about modeling the world by guessing like this. And it's useful because we don't need labels provided by a teacher. Babies do a lot of unsupervised learning by watching and imitating people. And we'd like computers to be able to learn like this as well.2. The correct answer should be plausible and directly related to the information presented in the paragraph.3. Distractors should be reasonable but incorrect choices that may reflect common misconceptions or misinterpretations.5. Avoid questions that can be answered simply by recalling facts from the paragraph. Instead, aim to assess deeper understanding, critical thinking, and the ability to apply knowledge.For each multiple-choice question, provide the question text followed by four answer options, separated by line breaks. Mark the correct answer with an asterisk (*) at the beginning of the correct option.Question 1: \"question body?\"Question 2: \"what is an example of a supervised learning algorithm?\"Question 3: \"Can an unsupervised learning algorithm be used to predict text labels?\""
#         # return text.split("Question")
#         mcqs = []
        

#         print('Generating MCQs from Transcript for a total of paragraphs...', end = "")
#         paragraphs = str(content).split('\n\t')
        
#         print(len(paragraphs))
        
#         # print(paragraphs)
        
#         # get heading
#         for paragraph in paragraphs:
#             mcq = get_mcq(paragraph)
#             mcqs.append(mcq)
#             # res += f"{mcq}\n{paragraph}\n\n"

#         return json.dumps(mcqs) # original, uncomment this
#         # return final_transcript() # hard coded, comment this
        
#     except Exception as e:
#         print(f"An error occurred: {e}")
#         print("Detailed traceback:")
#         traceback.print_exc()
#         return {"error: ", str(e)}

