import mongoose from 'mongoose';
const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [QuestionSchema],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdby:{type:String},
});
const Quiz = mongoose.model('Quiz', QuizSchema);
export default Quiz;
