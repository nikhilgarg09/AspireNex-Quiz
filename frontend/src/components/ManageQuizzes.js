import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ManageQuizzes() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = await axios.get('http://localhost:5000/api/auth/getme',{
          headers: { Authorization: `Bearer ${token}` }
        });
        const response = await axios.get('http://localhost:5000/api/quizzes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.data;
        setQuizzes(data.filter(quiz => quiz.creator === user.data._id.toString()));

      } catch (err) {
        console.error(err);
      }
    };

    fetchQuizzes();

  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const user = await axios.get('http://localhost:5000/api/auth/getme',{
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("hello");
      const response = await axios.delete(`http://localhost:5000/api/quizzes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = response.data;
      setQuizzes(data.filter(quiz => quiz.creator === user.data._id.toString()));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='p-4 m-4'>
    <h2 className='font-bold text-2xl'>Manage Your Quizzes</h2>
    <ul role="list" className="divide-y divide-gray-100 p-2 m-2">
    {quizzes.map((quiz) => (
      <li key={quiz._id} className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
          <Link className="text-sm font-semibold leading-6 text-gray-900" to={`/edit-quiz/${quiz._id}`}>{quiz.title}</Link>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
         
           <button onClick={() => handleDelete(quiz._id)}>Delete</button>
        </div>
      </li>
    ))}
  </ul>
  </div>



  );
}

export default ManageQuizzes;
