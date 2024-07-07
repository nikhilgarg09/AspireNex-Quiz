import Quiz from '../models/Quiz.js';
export const createquiz = async (req, res) => {
    const { title, questions } = req.body;
    const quiz = new Quiz({ title, questions, creator: req.user._id ,createdby:req.user.username});
    try {
      await quiz.save();
      res.json(quiz);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
export const getquizzes =  async (req, res) => {
    try {
      const quizzes = await Quiz.find();
      res.json(quizzes);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

export const getquiz = async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id);
      res.json(quiz);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).send({ error: 'Quiz not found' });
    }
    await quiz.deleteOne();
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).send({ error: 'Internal server error' });
  }
};  

export const submitquiz = async(req,res)=>{
  try {
    const id = req.params.id;
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).send({ error: 'Quiz not found' });
    }
    const userAnswers = req.body.answers;
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === userAnswers[index]) {
        score++;
      }
    });
    const result = {
      score,
      total: quiz.questions.length,
      percentage: (score / quiz.questions.length) * 100
    };

    res.send(result);

  } catch (error) {
    console.log(err.message);
    res.status(500).send({ error: 'Internal server error' });
  }
}
