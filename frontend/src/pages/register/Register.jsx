import './register.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../constants';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(false)

        const newUser = {
            username,
            email,
            password
        }

        if (file) {
            const data = new FormData();
            console.log("data 1", data)
            const filename = Date.now() + file.name;
            data.append("name", filename)
            data.append("file", file)
            console.log("data 2", data)
            newUser.profile = filename;
            try {
                await axios.post('/upload', data)
            } catch (err) {
                console.log(err)
            }
        }

        try {
            const res = await axios.post(`${baseUrl}/auth/register`, newUser)
            res.data && window.location.replace("/login")
        }
         catch(err) {
            setError(true)
        }

    }
    
    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input 
                    type="text" 
                    className="registerInput" 
                    placeholder="Enter your username..." 
                    onChange={e => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input 
                    type="email" 
                    className="registerInput" 
                    placeholder="Enter your email..." 
                    onChange={e => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input 
                    type="password" 
                    className="registerInput" 
                    placeholder="Enter your password..." 
                    onChange={e => setPassword(e.target.value)}
                />
                <label>Profile Picture</label>
                <input 
                    type="file" 
                    className="registerInput" 
                    placeholder="Choose profile picture" 
                    onChange={e => setFile(e.target.files[0])}
                />
                <button className="registerButton">Register</button>
                {error && <span style={{marginTop: '1rem', color: 'red', textAlign: 'center'}}>Something went wrong</span> }
            </form>

            <Link className="link registerLoginButton" to="/login">Login</Link>

        </div>
    )
}