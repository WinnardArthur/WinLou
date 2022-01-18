import SinglePost from '../../components/singlePost/SinglePost';
import './single.scss';

export default function Single({ categories }) {
    return (
        <div className="single">
            <SinglePost />   
            {/* <Sidebar categories={categories}/> */}
        </div>
    )
}
