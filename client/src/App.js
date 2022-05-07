
import './App.css';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './components/auth/signup';
import Login from './components/auth/login';
import axios from 'axios';
function App() {

  const [isAuth, setAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const _token = localStorage.getItem('token')
    const expiryDate = localStorage.getItem('expiryDate');
    if (!_token || !expiryDate) {
      return
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }

    const _userInfo = {
      _userId: localStorage.getItem('userId'),
      _status: localStorage.getItem('status'),
      _username: localStorage.getItem('username'),
      _name: localStorage.getItem('uName'),
      _pfp: localStorage.getItem('_pfp'),
      _email: localStorage.getItem('email'),
    }
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    setUserInfo(_userInfo)
    setAuth(true)
    setAutoLogout(remainingMilliseconds);
  }, [isAuth])


  const signupHandler = (data) => {
    console.log(data)
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email)
    formData.append('username', data.username)
    formData.append('password', data.password)
    formData.append('image', data.image)
    axios.post('http://localhost:8080/signup', formData)
      .then((response) => {
        console.log(response)
        navigate("/login")
      }).catch(err => {
        console.log(err);
      })
  }

  const signinHandler = (data) => {
    console.log(data)

    axios.post('http://localhost:8080/login', data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        console.log(res.data)
        res = res.data
        setToken(res.token)
        setUserInfo(res.userInfo)
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );


        setAutoLogout(remainingMilliseconds);
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', res.userInfo.email);
        localStorage.setItem('userId', res.userInfo._id);
        localStorage.setItem('pfp', res.userInfo.imageUrl);
        localStorage.setItem('uName', res.userInfo.name);
        localStorage.setItem('username', res.userInfo.username);
        localStorage.setItem('status', res.userInfo.status);
        localStorage.setItem('expiryDate', expiryDate.toISOString());

        setAuth(true);
        navigate("/");
      }).catch(err => {
        console.log(err);
      })
  }
  const logoutHandler = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('email')
    localStorage.removeItem('userId');
    localStorage.removeItem('pfp');
    localStorage.removeItem('uName');
    localStorage.removeItem('username');
    localStorage.removeItem('status');
    localStorage.removeItem('expiryDate');
    setAuth(false);
    console.log('Logged out')
    navigate("/login")
  }

  const setAutoLogout = milliseconds => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  return (
    <div className="App">

      <Routes>
        <Route exact path='/' element={<Home isAuth={isAuth} logoutHandler={logoutHandler} />}> </Route>
        <Route exact path="/signup" element={<Signup signupHandler={signupHandler} />} />
        <Route exact path="/login" element={<Login signinHandler={signinHandler} />} />
      </Routes>
    </div>
  );
}

export default App;
