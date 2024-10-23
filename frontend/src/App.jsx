// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar'; // เพิ่ม Navbar ที่นี่
import NotFound from './pages/NotFound';

const App = () => {
    return (
        <Router>
            <Navbar /> {/* แสดง Navbar */}
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
