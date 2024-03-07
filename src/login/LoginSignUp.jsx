import './LoginSignUp.css'
import email_icon from '../assets/email.png'
import password_icon from '../assets/password.png'
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import {register} from "../redux/slices/Auth";
import {useNavigate} from "react-router-dom";

export const LoginSignUp = ({visible,visibleHandler}) => {

    if (visible){
        visibleHandler()
    }

    const [action, setAction] = useState("Sign Up")
    const nav = useNavigate();
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!username || !password) {
            console.error("Please fill in all fields");
            return;
        }

        const formData = {
            username,
            password
        }
        console.log(formData)

        try {
            let response;

            if (action === "Sign Up") {
                response = await axios.post('http://localhost:8765/auth-service/register', formData);
            } else {
                response = await axios.post('http://localhost:8765/auth-service/login', formData);
            }

            const { data } = response;

            localStorage.setItem('userId', data.userId)

            dispatch(register(data.userId));

            if (response.status) {
                console.log(`${action} successful!`);
                visibleHandler()
                nav('/notes')
            } else {
                console.error(`${action} failed:`, response.statusText);
            }
        } catch (error) {
            console.error(`Error during ${action.toLowerCase()}:`, error);
        }
    };


    return (
        <div className="container">

            <form onSubmit={handleSubmit}>
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>

                <div className="inputs">
                    <div className="input">
                        <img src={email_icon} alt=""/>
                        <input type="email" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="input">
                        <img src={password_icon} alt=""/>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>

                <div className="submit-container">

                    <button className="submit" type="submit" onClick={() => {
                        setAction("Sign Up");
                    }}>Sign Up
                    </button>
                    <button className="submit" type="submit" onClick={() => {
                        setAction("Login")
                    }}>Login
                    </button>
                </div>
            </form>
        </div>
    )
}