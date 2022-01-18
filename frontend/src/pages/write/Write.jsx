import axios from 'axios';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import './write.scss'

export default function Write() {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const {username} = useSelector(state => state.user.userInfo)

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
        setSlug(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost =  {
            username: username,
            title,
            desc,
            slug,
            category
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename)
            data.append("file", file)
            newPost.photo = filename;
            try {
                await axios.post("/upload", data)
            } catch (err) {
                console.log(err)
            }
        }

        try {
          const res = await axios.post("/posts", newPost)            
          window.location.replace("/posts/"+res.data._id)
        } catch (err) {
            console.log(err)
        }
    } 

    return (
        <div className="write">
            {file && (
                <img src={URL.createObjectURL(file)} alt={title} className="writeImg" />
            )}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <select name="category" id="category" onChange={e => setCategory(e.target.value)}>
                        <option className='selectName'>Category</option>
                        <option value="Programming">Programming</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Sports">Sports</option>
                        <option value="Writing">Writing</option>
                        <option value="Education">Education</option>
                        <option value="Music">Music</option>
                        <option value="Health">Health</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input 
                        type="file" 
                        name="" 
                        id="fileInput" 
                        style={{display: 'none'}}
                        onChange={e => setFile(e.target.files[0])}    
                    />
                    <input 
                        type="text" 
                        name="" 
                        placeholder="Title" 
                        className="writeInput" 
                        autoFocus
                        onChange={handleTitleChange}
                    />
                    <input 
                        type="text" 
                        name=""
                        className='writeInput slugInput'
                        value={!slug ? 'Slug' : `${slug.toLowerCase().replaceAll(' ', '-')}`}
                    />
                    
                </div>
                <div style={{marginTop: '3rem'}} className="writeFormGroup">
                    <textarea 
                        name="" 
                        id="" 
                        type="text" 
                        placeholder="Tell your story..." 
                        className="writeInput writeText"
                        onChange={e => setDesc(e.target.value)}    
                    >

                    </textarea>
                    <button className="writeSubmit">Publish</button>
                </div>
            </form>
        </div>
    )
}
