
import './App.css';
import React from 'react';
import AppLayout from './pages/layout';
import { Routes ,Route } from 'react-router-dom';
import Signup from './components/auth/signup';
import Login from './components/auth/login';

function App() {
  return (
    <div className="App">
           
            <Routes>
              
                <Route exact path='/' element={<AppLayout />}> </Route>
                <Route exact path="/signup" element={<Signup/>} />
                <Route exact path="/login" element={<Login/>} />
            </Routes>
    </div>
  );
}

export default App;
