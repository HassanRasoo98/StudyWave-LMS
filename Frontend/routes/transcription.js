import OpenAI from "openai";
dotenv.config();
import dotenv from 'dotenv';


const router = express.Router()

const transcribe = async(req, res) => {
    const transcription = await openai.audio.transcriptions.create({
        // file: fs.createReadStream(yourPathValue),
        file: yourPathValue,
        model: "whisper-1",
      });

      console.log(transcription.text);
      return transcription.text;
}

router.post('/transcription', transcribe)
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export default router