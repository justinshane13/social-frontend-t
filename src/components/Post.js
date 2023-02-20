// date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePostsContext } from '../hooks/usePostsContext'

const Post = ({post}) => {
    const { dispatch } = usePostsContext()
    const { user } = useAuthContext()

    const handleDelete = async () => {
        if (!user) {
            return
        }

        const response = await fetch(`/api/posts/${post._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_POST', payload: json})
        }
    }

    return (
        <div className="post">
            <img className="profile-image" src="/images/IMG_2040.jpg" alt="profile" />
            <div className="post-content-container">
                <div className="post-top-row">
                    <p className="author">{post.author}</p>
                    {user && user.username === post.author && <button onClick={handleDelete} className="delete-button">Delete</button>}
                </div>
                <p className="title">{post.title}</p>
                <p className="content">{post.content}</p>
                <p className="date">{formatDistanceToNow(new Date(post.createdAt))} ago in {post.topic[0].toUpperCase() + post.topic.substring(1)}</p>
            </div>
        </div>
    )
}

export default Post