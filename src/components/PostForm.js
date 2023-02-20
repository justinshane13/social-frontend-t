import { useState } from 'react'
import { usePostsContext } from '../hooks/usePostsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const PostForm = ({topic}) => {
    const {posts, dispatch} = usePostsContext()
    const {user} = useAuthContext()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isActive, setIsActive] = useState(false)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const post = {
            title: title,
            content: content,
            author: user.username,
            topic: topic.toLowerCase()
        }

        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setError(null)
            setEmptyFields([])
            setTitle('')
            setContent('')
            console.log('new post added!')
            dispatch({type: 'ADD_POST', payload: json})
            setIsActive(false)
        }
    }

    const cancelPost = () => {
        setTitle('')
        setContent('')
        setIsActive(false)
    }

    return (
        <div className="form-container">
            {!isActive && <button onClick={() => setIsActive(true)} className="add-post-button">Add post <img className="add-icon" src='/images/add-large.png' alt='add icon' /></button>}
            {isActive && 
                <div className="form-flexbox">
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Post title"
                            className={emptyFields.includes('title') ? "input-title error" : "input-title"}
                        />
                        {emptyFields.includes('title') && <div className='input-error'>{error}</div>}
                        <textarea 
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Share your thoughts"
                            className={emptyFields.includes('content') ? "input-content error" : "input-content"}
                            maxLength={300}
                        />
                        {emptyFields.includes('content') && <div className='input-error'>{error}</div>}
                        <div className="post-form-button-container">
                            <button className="input-button">Post</button>
                            <div className="cancel-button" onClick={cancelPost}>Cancel</div>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default PostForm