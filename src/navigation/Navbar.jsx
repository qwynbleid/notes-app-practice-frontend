import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from './Navbar.module.css'

function Header({visibleHandler}) {
    const nav = useNavigate()

    const onLogOutHandler = ()=>{
        window.localStorage.removeItem('userId')
        visibleHandler()
        nav('/')
    }

    return (
        <header>
            <div className={styles.leftSide}>
                <h1 style={{color: '#fff'}}>Notes Manager</h1>
                <button
                    onClick={onLogOutHandler}
                    style={{
                        backgroundColor: '#fff',
                        fontSize: '18px',
                        cursor: 'pointer',
                        borderRadius: '6px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;