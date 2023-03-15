import { useLocation } from 'react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './singlePost.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../constants';

export default function SinglePost() {
    const location = useLocation()
    const path = (location.pathname.split("/")[2])
    const [post, setPost] = useState({})
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const user  = useSelector(state => state.user.userInfo)
    
    
    const PF = `${baseUrl}/images/`;

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`${baseUrl}/api/posts/` + path);
            setPost(res.data);
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
        getPost()
    }, [path])

    const handleDelete = async () => {
        try {
            await axios.delete(`${baseUrl}/api/posts/`+ path, {
                data: {username: user.username}
            }
            )
            window.location.replace("/"); 
        }
        catch (err) {
            console.log('err', err)
        }
    }
    
    const handleUpdate = async () => {
        try {
            await axios.put(`${baseUrl}/api/posts/${post._id}`, {
                username: user.username, title, desc
            })
            setUpdateMode(false)
        } catch (err) {

        }
    }

    console.log('u', user)
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo ? <img src={PF + post.photo} className="singlePostImg" /> : <img src="/images/apple-iphone-smartphone.jpg" alt="" className="singlePostImg" />}
                {
                    updateMode ? <input 
                                    type="text" 
                                    className="singlePostTitleInput" 
                                    value={title} 
                                    onChange={e => setTitle(e.target.value)}    
                                    autoFocus
                                /> : (
                        <h1 className="singlePostTitle">
                            {title}
                            {post.username === user?.username && (
                                <div className="singlePostEdit">
                                <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                            </div>
                            )}
                        </h1>
                    )
                }
                
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author: 
                        <Link to={`/?user=${post.username}`} className="link">
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>

                {
                    updateMode ? (
                        <textarea 
                            value={desc} 
                            className="singlePostDescInput" 
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    ) :  (
                        <p className="singlePostDesc">{desc}</p>
                    )
                }
                {
                    updateMode && (
                        <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                    )
                }
            </div>
        </div>
    )
}
