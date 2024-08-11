from flask import Flask, request, jsonify
from pydub import AudioSegment
from moviepy.editor import VideoFileClip
import whisper
from flask_cors import CORS
import os
import pdfplumber
import pandas as pd

app = Flask(__name__)

# Enable CORS for your React app's origin
# Update CORS configuration
CORS(app, resources={r"/transcribe": {"origins": "*"}})
CORS(app, resources={r"/extract-mcqs": {"origins": "*", "headers": "Content-Type"}})
# Load the Whisper model
model = whisper.load_model('small')

VIDEOS_PATH = r"E:\FYP\media\uploads" 
PDF_PATH = r"D:\Coding Practice\React\Hassan Rana FYP\FYP-FINAL\media" # ABS PATH TO media folder

''' App Functions '''
def extract_mcqs_from_pdf(pdf_file):
    tables = None
    mcqs = {}

    try:
        with pdfplumber.open(pdf_file) as pdf:
            sr_no = 1
            print(f"Extracting MCQs from PDF file : {len(pdf.pages)}")
            for page_number in range(len(pdf.pages)):
                page = pdf.pages[page_number]
                tables = page.extract_tables()
                for index, data in enumerate(tables[0]):
                    if None in data: 
                        # print(f"Found None at SR {index} in page {page_number + 1} - Actual Data {data}")
                        continue
                    
                    # Question, A, B, C, D, correct
                    mcq_data = [None, None, None, None, None, None]

                    if data[0].isdigit():
                        mcq_data[0] = "" if data[1] == None else data[1]
                        mcq_data[1] = "" if data[2] == None else data[2]
                        mcq_data[2] = "" if data[3] == None else data[3]
                        mcq_data[3] = "" if data[4] == None else data[4]
                        mcq_data[4] = "" if data[5] == None else data[5]
                        mcq_data[5] = "" if data[6] == None else data[6]

                    else:
                        continue

                    if None in mcq_data: 
                        # print(f"Found None in Filtered MCQ List {mcq_data} at SR {index} in page {page_number + 1} - Actual {data}")
                        continue

                    try:
                        mcqs[sr_no] = list(map(lambda x: x.replace("\n", " "), mcq_data))
                        sr_no += 1

                    except:
                        # print(f"Failed to extract MCQs from {data}")
                        pass

    except Exception as e:
        print(f"Failed to extract mcqs from {pdf_file}")

    return mcqs


def save_to_sheet(mcqs, sheet_file):
    if not isinstance(mcqs, dict):
        raise TypeError("MCQs must be of type dict")

    try:
        df = pd.DataFrame(
            columns=["Question", "A", "B", "C", "D", "Answer"]
        )
        
        for key, value in mcqs.items():
            df.loc[len(df)] = value

        df.to_csv(sheet_file, index=False, encoding="utf-8")
        print(f"File {sheet_file} saved successfully")

    except Exception as e:
        print(f"Got an error while saving to sheet {e}")

''' Routes Functions '''

@app.route('/transcribe', methods=['POST','GET'])
def transcribe_video():
    try:
        data = request.get_json(force=True)  # force=True forces parsing even if content type is not 'application/json'
        video_path = data.get('videoPath')

        if not video_path:
            return jsonify({'error': 'No video path provided'}), 400

        video = VideoFileClip(f'{VIDEOS_PATH}\\{video_path}')
        audio = video.audio
        audio.write_audiofile('audio.wav')

        # Transcribe the audio using Whisper
        result = whisper.transcribe(model, 'audio.wav', language='en')

        print(result, result['text'])
        # Return the transcript as JSON
        return jsonify({'transcript': result['text']}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/extract-mcqs', methods=['POST', 'GET'])
def extract_mcqs():
    print("Processing PDF .. ")
    try:
        file_name = request.args.get('fileName')
        print(file_name)

        if not file_name:
            return jsonify({'error': 'No file name provided'}), 400

        pdf_path = os.path.join(PDF_PATH, file_name)

        print(f"PATH = {pdf_path}")
        if 'pdf_file' not in request.files:
            return jsonify({'error': 'PDF file not provided'}), 400

        pdf_file = request.files['pdf_file']
        pdf_file.save(pdf_path)

        csv_filename = file_name.split(".")[0] + "_csv.csv"
        sheet_file = os.path.join(PDF_PATH, csv_filename)

        extracted_mcqs = extract_mcqs_from_pdf(pdf_path)

        if len(extracted_mcqs) == 0:
            return jsonify({"message": f"MCQs extraction Failed"})

        try:
            save_to_sheet(extracted_mcqs, sheet_file)
            return jsonify({"message": f"MCQs extracted and saved as {sheet_file} successfully."})

        except Exception as e:
            return jsonify({"message": f"Failed to save extracted mcqs to sheet!"})
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
