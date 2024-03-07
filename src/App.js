import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotesPage from "./notes/NotesPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import {LoginSignUp} from "./login/LoginSignUp";
import Navbar from "./navigation/Navbar";
import './App.css'

const App = () => {
    const [visible , setVisible] = useState(true)

    const changeVisibleOfHeader = ()=>{
        setVisible((prev)=> !prev)
    }
    return (
        <Router>
            {visible && <Navbar visibleHandler={changeVisibleOfHeader}/>}
            <Routes>
                <Route path="/" element={<LoginSignUp visible={visible} visibleHandler={changeVisibleOfHeader}/>} />
                <Route path="/notes" element={<NotesPage />} />
            </Routes>
        </Router>
    );
};

export default App;
