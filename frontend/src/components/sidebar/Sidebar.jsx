import './sidebar.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../redux/categorySlice';


export default function Sidebar() {
    const [cats, setCats] = useState([])
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.categories)

    const handleCategory = (e) => {
        dispatch(addCategory({category: e.target.innerHTML}))
    }

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get('/categories')
            setCats(res.data)
            console.log('cat', cats)
        }

        getCats()
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebarContent">

                <div className="sidebarItem">
                    <span className="sidebarTitle">ABOUT ME</span>
                    <img src="/images/austin.jpg" alt="user" />
                    <p>
                        Pascal Illoris
                    </p>
                </div>

                <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES </span>
                <ul className="sidebarList">
                    {categories.map((c) => (
                        <div key={c.id}>
                            <Link
                                to={`/?category=${c.category}`} 
                                className="link"
                                onClick={handleCategory}
                                >
                                <li className="sidebarListItem">{c.category}</li>
                            </Link>
                        </div>

                    ))}                    
                </ul>
                </div>

                <div className="sidebarItem">
                    <span className="sidebarTitle">FOLLOWERS</span>
                    <div className="sidebarSocial">
                        <i className="sidebar-icon fab fa-facebook-square"></i>
                        <i className="sidebar-icon fab fa-twitter-square"></i>
                        <i className="sidebar-icon fab fa-pinterest-square"></i>
                        <i className="sidebar-icon fab fa-instagram-square"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
