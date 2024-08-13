import OpenAI from "openai";
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
dotenv.config();

const router = express.Router();

router.post('/transcription', async(req, res) => {
  const query = req.query;
  const path = query['path']

  console.log(query);
  console.log(path);

  // Get the current working directory
  const currentDirectory = process.cwd();

  // const fullPath = path.join(currentDirectory, path)

  console.log('Current working directory:', currentDirectory);

  const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(currentDirectory + path),
    // file: path,
    model: "whisper-1",
  });

  // console.log(transcription.text);
  res.status(200).json({text : transcription.text});
});

export default router;

