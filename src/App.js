import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';
import Image from './pages/Image';


function App() {
    
    return (

        <Router>
            <Routes>      
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/user" element={<User/>}/>
                <Route path="/image" element={<Image/>}/>
                <Route path="/signup-test" element={<Signup/>}/>
            </Routes>
        </Router>

    );
}


export default App;
