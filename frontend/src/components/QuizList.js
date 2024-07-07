import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quizzes');
        setQuizzes(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuizzes();
  }, []);

  return (

    <div className='p-4 m-4'>
    <h2 className='font-bold text-2xl'>Available Quizzes</h2>
    <ul role="list" className="divide-y divide-gray-100">
    {quizzes.map((quiz) => (
      <li key={quiz._id} className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
          <Link className="text-sm font-semibold leading-6 text-gray-900" to={`/quiz/${quiz._id}`}>{quiz.title}</Link>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">Created by {quiz.createdby}</p>
        </div>
      </li>
    ))}
  </ul>
  </div>


  );
}

export default QuizList;
