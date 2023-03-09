import './posts.scss';
import Post from '../post/Post';
import Loader from '../loader/Loader';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Posts({posts}) {
    const {search } = useLocation()
    const queryName = search.split('=')[0]
    const queryValue = search.split('=')[1]
    const [doneLoading, setDoneLoading] = useState(false);

    useEffect(() => {
        setDoneLoading(false);
        let loadingTimeout = setTimeout(() => {
            setDoneLoading(true)
        }, 6000)

        return () => clearTimeout(loadingTimeout)
    }, [posts, queryName])

    console.log(queryName)

    console.log('pathname', search)

    // const category = useSelector(state => state.categories.activeCategory)

    return (
        <div className="posts">
            {
                queryName === '?category' ?
                (<h1>{queryValue} Articles</h1>) :
                queryName === '?user' ? 
                (<h1>{queryValue} Articles</h1>) :
                (<h1>Recent Articles</h1>)
            }
            <div className="postsBody">
                {
                    posts.length > 0 ? 
                    posts?.map((p, i) => (
                        <>
                        {/* {
                            queryName === '?category' ?
                            (<h1>{p.category} Articles</h1>) :
                            queryName === '?user' ? 
                            (<h1>{p.username} Articles</h1>) :
                            (<h1>Recent Articles</h1>)
                        } */}
                        <div 
                            key={i}
                            className='article'
                        >
                            <Post post={p}/>
                        </div>
                        </>
                    )) 
                    : 
                    <>
                        {doneLoading ? <h3 className='no-post'>Sorry, no post found...</h3> : <Loader />}
                    </>
                }
            </div>
        </div>
    )
}
