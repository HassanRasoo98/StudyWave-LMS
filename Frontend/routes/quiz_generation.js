import OpenAI from "openai";
import dotenv from 'dotenv';
import express, { response } from 'express';
dotenv.config();

const router = express.Router();

router.post('/generate_quiz', async(req, res) => {
  const example_json = {
    'questions': [
      {
        'question': 'What type of artificial intelligence has the series Crash Course AI primarily focused on?',
        'options': [
          'Unsupervised Learning',
          'Reinforcement Learning',
          'Supervised Learning',
          'Semi Supervised Learning'
        ], 
        'answer': 'Supervised Learning'
      }
    ]
  }

  console.log(example_json);

    res.status(200).json(`    
      {
        "questions": [
          {
            "question": "What type of artificial intelligence has the series Crash Course AI primarily focused on?",
            "options": [
              "Unsupervised Learning",
              "Reinforcement Learning",
              "Supervised Learning",
              "Semi Supervised Learning"
            ], 
            "answer": "Supervised Learning"
          }
        ]
      }`);

  //   const transcript = req.body['transcript']
  //   console.log(transcript);

  //   const system_prompt = `You are an intelligent agent designed to generate quiz mcqs from an input transcript. 
  //   The user will provide you with an input of a transcription. Your task is to generate technical and logical mcqs from the transcript that will test his 
  //   learning related to the content of the transcription. Yur response must be in JSON format. 
    
  //   Example JSON response : 
  //     {
  //       'questions': [
  //         {
  //           'question': 'What type of artificial intelligence has the series Crash Course AI primarily focused on?',
  //           'options': [
  //             'Unsupervised Learning',
  //             'Reinforcement Learning',
  //             'Supervised Learning',
  //             'Semi Supervised Learning'
  //           ], 
  //           'answer': 'Supervised Learning'
  //         }
  //       ]
  //     }`

  //   const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
  //   const completion = await openai.chat.completions.create({
  //       messages: [
  //           {"role": "system", "content": system_prompt},
  //           {"role": "user", "content": transcript}
  //         ],
  //       model: "gpt-3.5-turbo",

  //       response_format: {"type": "json_object"}
  //     });
    
  //     console.log(completion.choices[0].message.content);

  // // console.log(transcription.text);
  // res.status(200).json(completion.choices[0].message.content);
});

export default router;

