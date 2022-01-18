import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './post.scss';

export default function Post({ post }) {
    const PF = "http://localhost:5000/images/";

    return (
        <div className="post">
            { 
                post.photo ? 
                <img src={PF + post.photo} className="postImg" alt={post.title}/> 
                : 
                <img src="/images/apple-iphone-smartphone.jpg" alt="" className="postImg" /> 
            }
            <div className="postInfo">
                <Link to={`/?category=${post?.category}`} className="postCats link">
                    {post.category ? `${(post.category)}` : 'Other'}
                </Link>
                <Link to={`/posts/${post._id}`}  className="postTitle link">{post.title}</Link>
                
            </div>
            <p className="postDesc">
               {post.desc}
            </p>
            <div className="postAuthor">
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
                <i>post by <Link to={`/?user=${post.username}`} className="authorLink link">{post.username}</Link></i>
            </div>
        </div>
    )
}
