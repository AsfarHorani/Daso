
import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import Home from './pages/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './pages/auth/signup';
import Login from './pages/auth/login';
import Conversation from './components/Conversation';
import { AuthContext } from './context/AuthContext';
import openSocket from 'socket.io-client';

function App() {

  const { loading, isAuth, setAuth } = useContext(AuthContext)


  const LandingPage = ({ isAuth }) => {
    const navigate = useNavigate();

    useEffect(() => {
  

      isAuth ? navigate("/t") : navigate("/login")
      console.log("rendering")
    }, [isAuth])
    return (<h2>Loading...</h2>);
  }

  return (
    <div className="App">

      <Routes>
        <Route index element={<LandingPage isAuth={isAuth} />} />
        <Route path='/t' element={<Home />} >
          <Route path='/t/:convoId' element={<Conversation />} />
        </Route>
        <Route path='/myprofile' element={<h2>Under Construction</h2>} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
