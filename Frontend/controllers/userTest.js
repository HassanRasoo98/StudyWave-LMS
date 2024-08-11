import basetestmodel from "../models/basetestmodel.js";
const shuffleArray = (array) => {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
export const getShuffledQuestions = async (req, res) => {
    try {
      const totalQuestionsToRetrieve = 10;
  
      // Find all questions in the BaseTest collection
      const allQuestions = await basetestmodel.find({}, 'questions');
  
      if (!allQuestions) {
        return res.status(404).json({ error: 'No questions found' });
      }
  
      // Extract all questions into a single array
      const questionsArray = allQuestions.reduce((acc, curr) => [...acc, ...curr.questions], []);
  
      // Shuffle the questions
      const shuffledQuestions = shuffleArray(questionsArray);
  
      // Take the first 10 shuffled questions
      const selectedQuestions = shuffledQuestions.slice(0, totalQuestionsToRetrieve);
  
      return res.json({ questions: selectedQuestions });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
 