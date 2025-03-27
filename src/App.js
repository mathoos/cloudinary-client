import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ArticlesByUser from './pages/ArticlesByUser';
import Article from './pages/Article';
import Stuff from './pages/Stuff';
import Image from './pages/Image';


function App() {
    
    return (

        <Router>
            <Routes>  
                <Route path="/" element={<Homepage/>}/>    
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/dashboard/:id" element={<Dashboard/>}/>
                <Route path="/mes-articles/:id" element={<ArticlesByUser/>}/>
                <Route path="/article/:id" element={<Article />} />
                <Route path="/stuff" element={<Stuff/>}/>
                <Route path="/image" element={<Image/>}/>
            </Routes>
        </Router>

    );
}


export default App;
