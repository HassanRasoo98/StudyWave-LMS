import json
import traceback
from pydantic import BaseModel
import whisper
import uvicorn
from fastapi import FastAPI, File, Form, UploadFile
from moviepy.editor import VideoFileClip
from fastapi.middleware.cors import CORSMiddleware
from segmentation import segment_paragraphs
from utils import ParagraphInput, Transcribe, final_transcript, get_heading, get_mcq

# Create an instance of the FastAPI class
app = FastAPI()
model = whisper.load_model('small')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific origins if needed
    allow_credentials=True,
    allow_methods=["*"],  # You can specify specific methods (e.g., ["GET", "POST"])
    allow_headers=["*"],  # You can specify specific headers if needed
)

def whisper_transcribe(video_path):
    # Load the Whisper model
    print("Whisper model loaded successfully")

    video = VideoFileClip(video_path)
    audio = video.audio
    audio.write_audiofile('audio.wav')

    # Transcribe the audio using Whisper
    result = whisper.transcribe(model, 'audio.wav')

    # print(result['text']))

    return result['text']

# Define a route using a decorator
@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI!"}


@app.post("/transcribe/")
async def get_transcription(request: Transcribe):
    '''
        generates transcript of the video and automatically segments into paragraphs and adds topics to 
        the videos
    '''
    try:
        # Generate random text data
        # random_text = generate_random_text()

        print('Generating Transcript...')
        text = whisper_transcribe(model, request.path)

        print('Segmenting Transcript...')
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

        # return res # original, uncomment this
        return final_transcript() # hard coded, comment this

    except Exception as e:
        print("error", str(e))
        return final_transcript() # hard coded comment this
        # return {"error": str(e)}

class Transcript(BaseModel):
    text: str

@app.post('/generate-mcqs/')
# async def generate_mcqs():
async def generate_mcqs(file: UploadFile = File(...)):
    try:
        content_bytes = await file.read()

        # Decode the bytes to a str using the appropriate encoding (e.g., 'utf-8')
        content = content_bytes.decode('utf-8')
        
        # text = "Question 2: \"what is an example of a supervised learning algorithm?\"\na. Artificial Neural Networks (ANNs)\nb. Decision Trees*\nc. Linear Regression\nd. Random Forest\n\nQuestion 3: \"Can an unsupervised learning algorithm be used to predict text labels?\"\na. No (Incorrect)\nb. Yes\nc. *It depends on the specific use case\nd. Maybe  You are an intelligent chatbot. Based on the information provided in the paragraph below, generate three multiple-choice questions (MCQs) that test the user's understanding and critical thinking. Ensure that the questions challenge the user's knowledge and comprehension of the material and avoid creating trivial or overly obvious questions.In supervised learning, we're trying to build a model to predict an answer or label provided by a teacher. In unsupervised learning, instead of a teacher, the world around us is basically providing training labels. For example, if I freeze this video of a tennis ball right now, can you draw what could be the next frame? Unsupervised learning is about modeling the world by guessing like this. And it's useful because we don't need labels provided by a teacher. Babies do a lot of unsupervised learning by watching and imitating people. And we'd like computers to be able to learn like this as well.2. The correct answer should be plausible and directly related to the information presented in the paragraph.3. Distractors should be reasonable but incorrect choices that may reflect common misconceptions or misinterpretations.5. Avoid questions that can be answered simply by recalling facts from the paragraph. Instead, aim to assess deeper understanding, critical thinking, and the ability to apply knowledge.For each multiple-choice question, provide the question text followed by four answer options, separated by line breaks. Mark the correct answer with an asterisk (*) at the beginning of the correct option.Question 1: \"question body?\"Question 2: \"what is an example of a supervised learning algorithm?\"Question 3: \"Can an unsupervised learning algorithm be used to predict text labels?\""
        # return text.split("Question")
        mcqs = []
        

        print('Generating MCQs from Transcript for a total of paragraphs...', end = "")
        paragraphs = str(content).split('\n\t')
        
        print(len(paragraphs))
        
        # print(paragraphs)
        
        # get heading
        for paragraph in paragraphs:
            mcq = get_mcq(paragraph)
            mcqs.append(mcq)
            # res += f"{mcq}\n{paragraph}\n\n"

        return json.dumps(mcqs) # original, uncomment this
        # return final_transcript() # hard coded, comment this
        
    except Exception as e:
        print(f"An error occurred: {e}")
        print("Detailed traceback:")
        traceback.print_exc()
        return {"error: ", str(e)}


if __name__ == "__main__":
    uvicorn.run("api:app", port=8000, reload=True)