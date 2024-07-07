import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TakeQuiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
        setQuiz(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleChange = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(answers);
    try {
      const response = await axios.post(`http://localhost:5000/api/quizzes/submit/${id}`, { answers });
      setResult(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div>
      <h2>{quiz.title}</h2>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((q, index) => (
          <div key={index}>
            <p>{q.question}</p>
            {q.options.map((option, i) => (
              <label key={i}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  onChange={() => handleChange(index, option)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {result && (
        <div>
          <h3>Your Score: {result.score}</h3>
        </div>
      )}
    </div>
  );
}

export default TakeQuiz;
