import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import QuizList from './components/QuizList.js';
import TakeQuiz from './components/TakeQuiz.js';
import ManageQuizzes from './components/ManageQuizzes.js';
import PrivateRoute from './components/PrivateRoute.js';
import SignUp from './components/SignUp.js';
import Login from './components/Login.js';
import CreateQuiz from './components/CreateQuiz.js';
import EditQuiz from './components/EditQuiz.js';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<PrivateRoute><QuizList/></PrivateRoute>}/>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/create-quiz" element={<PrivateRoute><CreateQuiz/></PrivateRoute>} />
          <Route path="/manage-quizzes" element={<PrivateRoute><ManageQuizzes/></PrivateRoute>} />
          <Route path="/quizzes" element={<QuizList/>} />
          <Route path="/quiz/:id" element={<TakeQuiz/>} />
          <Route path="/edit-quiz/:id" element={<EditQuiz/>}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
