import React from 'react';
import './App.css';
import CreateOrUpdate from './components/CreateOrUpdate/CreateOrUpdate.tsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import FetchOrDisplay from './components/FetchOrDisplay/FetchOrDisplay.tsx'


// Use React Router for page navigation:

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<CreateOrUpdate />} />
        <Route path = "/display-articles" element = {<FetchOrDisplay />} />
      </Routes>
    </BrowserRouter>
    
    </div>
    
    
    
  );
}

export default App;
