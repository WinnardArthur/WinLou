import axios from 'axios';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { baseUrl } from '../../constants';
import './settings.css';


export default function Settings() {

    const PF = `${baseUrl}/images/`

    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const {userInfo} = useSelector(state => state.user)


    useEffect(() => {
        if(Object.values(userInfo).length > 0) {
            setUsername(userInfo?.username)
            setEmail(userInfo?.email)
        }
    }, [userInfo])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedUser = {
            userId: userInfo._id,
            username, email, password
        }

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename)
            data.append("file", file)
            updatedUser.profilePic = filename
            try {
                await axios.post("/api/upload", data)
            } catch (err) {

            }
        }
        try {
             const res = await axios.put("/api/users/" + userInfo._id, updatedUser)
             localStorage.setItem('userInfo', JSON.stringify(res.data));

             console.log('res', res.data);
             setSuccess(true)
             
            } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Your Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={file ? URL.createObjectURL(file) : PF + userInfo.profile} alt="" />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" style={{display: 'none'}} onChange={(e) => setFile(e.target.files[0])}/>
                    </div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    <label>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <label>Password</label>
                    <input required type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <button className="settingsSubmit">Update</button> 
                    {success && <span style={{color: "green", textAlign: 'center', margin: '20px'}}>Profile has been updated...</span>}
                </form>
            </div>
            {/* <Sidebar /> */}
        </div>
    )
}
