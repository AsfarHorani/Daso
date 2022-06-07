import { createContext, useEffect, useReducer, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";






export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [userInfo, setUserInfo] = useState({});
  const [token, setToken] = useState(null);
  const [isAuth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState({});
  const [convId, setConvId] =useState(null);
  const navigate = useNavigate();
  
  
  useEffect(() => {

    function fetchData() {
      console.log("rendering app..")
      const expiryDate = localStorage.getItem('expiryDate') || null;
      const _token = localStorage.getItem('token') || null;
      if (!_token || !expiryDate) {
        return
      }
      if (new Date(expiryDate) <= new Date()) {

        logoutHandler();
        return;
      }

      const _userInfo = {
        userId: localStorage.getItem('userId'),
        status: localStorage.getItem('status'),
        username: localStorage.getItem('username'),
        name: localStorage.getItem('uName'),
        pfp: localStorage.getItem('_pfp'),
        email: localStorage.getItem('email'),
      }

      const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
      setUserInfo(_userInfo)
      setAuth(true)
      navigate("/");
      setToken(_token);
      setAutoLogout(remainingMilliseconds);
    }

    return fetchData();
  }, [isAuth])

  const signupHandler = (data) => {

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email)
    formData.append('username', data.username)
    formData.append('password', data.password)
    formData.append('image', data.image)
    axios.post('http://localhost:8080/signup', formData)
      .then((response) => {
        navigate("/login");
      }).catch(err => {
        console.log(err);
      })
  }

  const signinHandler = (data) => {


    axios.post('http://localhost:8080/login', data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((res) => {
      
        res = res.data 
        console.log(res.userInfo) 
        const _userInfo = {
          userId: res.userInfo._id,
          status: res.userInfo.status,
          username:  res.userInfo.username,
          name:  res.userInfo.uName,
          imageUrl:  res.userInfo._pfp,
          email:  res.userInfo.email,
        }
  
        setToken(res.token)
        setUserInfo(_userInfo)
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
  }

  const setAutoLogout = milliseconds => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };




  return (
    <AuthContext.Provider
      value={
        {
          isAuth,
          setAuth,
          signinHandler,
          signupHandler,
          token,
          setToken,
          userInfo,
          loading,
          contactInfo,
          setContactInfo,
          convId,
          setConvId
        }

      }
    >
      {children}
    </AuthContext.Provider>
  );
};