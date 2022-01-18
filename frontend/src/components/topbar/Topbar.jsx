import './topbar.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/userSlice';

export default function Topbar() {
    const {userInfo} = useSelector(state => state.user)
    console.log('userInfo', userInfo)
    const dispatch = useDispatch();
    
    const PF = 'http://localhost:5000/images/';

    const handleLogout = () => {
        localStorage.removeItem('userInfo')
        window.location.reload()
        // dispatch(logoutUser())
        console.log('Logout', userInfo)
    }

    return (
        <div className="top">
            <div className="topLeft">
                <h1><i>WinLou</i></h1>
            </div>

            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link to="/" className="link">HOME</Link> 
                    </li>
                    <li className="topListItem">
                        <Link to="/" className="link">ABOUT</Link> 
                    </li>
                    <li className="topListItem">
                        <Link to="/" className="link">CONTACT</Link> 
                    </li>
                    <li className="topListItem">
                        <Link to="/write" className="link">WRITE</Link> 
                    </li>
                    <li className="topListItem" onClick={handleLogout}>
                        {userInfo.username !== '' && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {userInfo.username !== '' ?
                    <Link to="/settings" className='userInfo'>
                        {
                            !userInfo.profile.length  ?
                                <img src={PF + `parrish-freeman-tPnAS7eG8Zk-unsplash.jpg`} alt="" className="topImg"/>  
                                :
                                <img src={PF + userInfo.profile} alt="" className="topImg"/>  
                        }
                        <h5>{userInfo.username} </h5>            
                    </Link>
                    
                    :
                    <ul className="topList">
                        <li className="topListItem">
                            <Link to="/register" className="link">REGISTER</Link> 
                        </li>

                        <li className="topListItem">
                        <Link to="/login" className="link">LOGIN</Link> 
                        </li>
                    </ul>
                }
                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    )
}
