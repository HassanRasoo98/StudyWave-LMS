import OpenAI from "openai/index.mjs";
import dotenv from 'dotenv';
import express, { response } from 'express';
dotenv.config();

const router = express.Router();

router.post('/generate_quiz', async(req, res) => {
    const transcript = req.body['transcript']

    const system_prompt = `
      You are an intelligent agent specialized in generating multiple-choice questions (MCQs) from educational lecture transcripts. Your primary objective is to create a specified number of MCQs, distributed across the specified difficulty levels ('easy', 'medium', 'hard').

      Detailed Instructions:
      1. Input:
        - You will receive a lecture transcript as input.
        - The user will specify the total number of MCQs and their difficulty-level distribution.

      2. Output:
        - Generate MCQs that test the technical understanding and logical comprehension of the transcript content.
        - Each question must:
          - Be concise and clearly stated.
          - Have four plausible options, only one of which is correct.
          - Specify the correct answer explicitly.
          - Include a difficulty level ('easy', 'medium', 'hard') as designated by the user.

      3. Formatting:
        - Your response must strictly adhere to the following JSON format:
          {
            "questions": [
              {
                "question": "What type of artificial intelligence has the series Crash Course AI primarily focused on?",
                "options": [
                  "Unsupervised Learning",
                  "Reinforcement Learning",
                  "Supervised Learning",
                  "Semi-Supervised Learning"
                ],
                "answer": "Supervised Learning",
                "difficulty": "easy"
              }
            ]
          }

      Key Considerations:
      - Ensure the MCQs are meaningful and contextually accurate based on the lecture content.
      - The difficulty level should align with the cognitive demand:
        - Easy: Basic recall or understanding of key concepts.
        - Medium: Application or interpretation of information.
        - Hard: Analysis, synthesis, or evaluation of complex ideas.
      - Avoid ambiguous or overly complex language.

      Additional Notes:
      - If the transcript lacks sufficient detail for the specified number of questions, use logical inferences or rephrase related concepts to craft appropriate questions.
      - Ensure the JSON response is syntactically correct to avoid errors during parsing.`

    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
    const completion = await openai.chat.completions.create({
        messages: [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": `Please Generate ${req.body['num_mcqs']} ${req.body['difficulty']} mcqs from the given lecture transcript:\n ${transcript}`}
          ],
        model: "gpt-3.5-turbo",

        response_format: {"type": "json_object"}
      });
    
      console.log(completion.choices[0].message.content);

      // console.log(transcription.text);
      res.status(200).json(completion.choices[0].message.content);
});

export default router;

