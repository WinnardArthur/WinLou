import { useState, useEffect } from 'react';
import axios from 'axios';
import './home.scss'
import Header from '../../components/Header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../../constants.js'


export default function Home() {

    const [posts, setPosts]= useState([]);
    const location = useLocation()
    const search = location.search
    
    console.log('search', search)


    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get(`${baseUrl}/api/posts`+search)
            setPosts(res.data)
        }

        fetchPosts()
    }, [search])

    return (
        <>
            <Header />
            <div className="home">
                <Posts posts={posts}/>
                <Sidebar />   
            </div>
        </>
    )
}
