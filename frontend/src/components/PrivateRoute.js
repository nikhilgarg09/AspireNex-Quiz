import React, { useEffect, useState } from 'react';
import { Route, redirect } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ManageQuizzes from './ManageQuizzes.js';
import CreateQuiz from './CreateQuiz.js';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate= useNavigate();
  const [hello,sethello] = useState(true);
  useEffect(()=>{
    const isAuthenticated = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        sethello(false);
        return false;
      }
  
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem('token');
          sethello(false);
          return false;
        }
        sethello(true);
        return true;
      } catch (err) {
        sethello(false);
        return false;
      }
    };
    isAuthenticated();
  },{})

  if(hello===false){
    return navigate("/login");
  }
  return children;
        
};

export default PrivateRoute;
