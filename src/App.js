import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Signup from './pages/Signup';
import User from './pages/User';
import Stuff from './pages/Stuff';
import Image from './pages/Image';


function App() {
    
    return (

        <Router>
            <Routes>      
                <Route path="/" element={<Home/>}/>
                <Route path="/sign-up" element={<Signup/>}/>
                <Route path="/user/:id" element={<User/>}/>
                <Route path="/stuff" element={<Stuff/>}/>
                <Route path="/image" element={<Image/>}/>
            </Routes>
        </Router>

    );
}


export default App;
