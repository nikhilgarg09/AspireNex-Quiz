import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function CreateQuiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleInputChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/quizzes/create', { title, questions }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/quizzes");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Quiz</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Quiz Title"
      />
      {questions.map((q, index) => (
        <div key={index}>
          <input
            type="text"
            value={q.question}
            onChange={(e) => handleInputChange(index, 'question', e.target.value)}
            placeholder={`Question ${index + 1}`}
          />
          {q.options.map((option, oIndex) => (
            <input
              key={oIndex}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
              placeholder={`Option ${oIndex + 1}`}
            />
          ))}
          <input
            type="text"
            value={q.correctAnswer}
            onChange={(e) => handleInputChange(index, 'correctAnswer', e.target.value)}
            placeholder="Correct Answer"
          />
        </div>
      ))}
      <button type="button" onClick={handleAddQuestion}>Add Question</button>
      <button type="submit">Create Quiz</button>
    </form>
  );
}

export default CreateQuiz;
