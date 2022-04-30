
import './App.css';
import React from 'react';
import AppLayout from './pages/layout';
import 'boxicons';
import { Routes ,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
           
            <Routes>
              
                <Route path='/' element={<AppLayout />}>
              
                </Route>
            </Routes>
    </div>
  );
}

export default App;
