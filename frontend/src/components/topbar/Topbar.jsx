import './topbar.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/userSlice';
import { baseUrl } from '../../constants';

export default function Topbar() {
    const {userInfo} = useSelector(state => state.user)
    console.log('userInfo', userInfo)
    const dispatch = useDispatch();
    
    const PF = `${baseUrl}/images`;

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
                            <img src={`${PF}/${userInfo.profile}`} alt="topImage" onError={(e) => e.target.src='https://images.unsplash.com/photo-1585994672551-ea9160cc4441?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJhY2tncm91ZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'}/>
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
