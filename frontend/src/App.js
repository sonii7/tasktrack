import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskTracker from "./components/Blog";
import NotFound from "./components/Notfound";
import Navbar from "./components/Navbar";
import Home from './components/Home';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route exact path="home" element={<Home />} />
          <Route exact path="blog" element={<TaskTracker />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
