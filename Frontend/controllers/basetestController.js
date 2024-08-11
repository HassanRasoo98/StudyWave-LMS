import basetestmodel from "../models/basetestmodel.js";
export const CreateTest = async (req, res) => {
  try {
    const { totalQuestions, Subject, Level, questions } = req.body;
    const test = new basetestmodel({ totalQuestions, Subject, Level, questions });
    await test.save();
    res.status(201).json({
      success: true,
      message: 'Test created successfully',
      test,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const GetQuiz = async(req,res)=>{
  try{
    const quizId = req.params.id;
    const quiz = await basetestmodel.findById(quizId)
    if (!quiz)
    {
      return res.status(404).send({ message: 'Quiz not found' });

    }
    res.status(201).json({
      success:true,
      message: 'Quiz Get successfully', 
      quiz
  });
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in Getting Quiz' });
  }
  
}
export const UpdateQuiz = async(req,res)=>{
  try {
    const testId = req.params.id; // Assuming you pass the test ID as a route parameter

    // Retrieve the updated data from the request body
    const { totalQuestions, Subject, Level, questions } = req.body;

    // Find the existing test document by its ID
    const existingTest = await basetestmodel.findById(testId);

    if (!existingTest) {
      return res.status(404).json({ error: 'Test not found' });
    }

    // Update the test document with the new data
    existingTest.totalQuestions = totalQuestions;
    existingTest.Subject = Subject;
    existingTest.Level = Level;
    existingTest.questions = questions;

    // Save the updated test document
    await existingTest.save();

    return res.json({ success: true, message: 'Test updated successfully', test: existingTest });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }

}
export const GetallQuiz = async(req,res)=>{
  try{
      const Quiz = await basetestmodel.find({});
      res.status(201).json({
        success:true,
        message: 'Get All Quiz Successfully', 
        Quiz
      })
  }catch(error)
  {
    console.error(error);
    res.status(500).json({ error: 'Error in Getting all Quiz' }); 
  }
}
export const DeleteQuiz = async(req,res)=>{
  try{
    const quizId = req.params.id;
    const Quiz = await basetestmodel.findByIdAndDelete(quizId);
    if (!Quiz){
      return res.status(404).send({ message: 'Quiz not found' });
    }
    res.status(201).json({
      success:true,
      message: 'Delete Quiz Successfully',
    })
  }catch(error)
  {
    console.error(error);
    res.status(500).json({ error: 'Error in Deleting Quiz' }); 
  }
}
