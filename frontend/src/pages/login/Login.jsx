import { Link } from 'react-router-dom';
import './login.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../../redux/apiCalls';


export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        LoginUser({username, password}, dispatch)
    }

    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input 
                    type="text" 
                    className="loginInput"
                    placeholder="Enter your username..." 
                    onChange={e => setUsername(e.target.value)}
                />
                <label>Password</label>
                <input 
                    type="password" 
                    className="loginInput" 
                    placeholder="Enter your password..." 
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="loginButton">
                    Login
                </button>
            </form>

            <Link to="/register" className="link loginRegisterButton">Register</Link>

        </div>
    )
}
