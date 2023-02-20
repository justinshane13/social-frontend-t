import Post from '../components/Post'
import PostForm from '../components/PostForm'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePostsContext } from '../hooks/usePostsContext'

const Posts = ({ topic, changeTopic, isOpen, setIsOpen }) => {
    const { posts } = usePostsContext()
    const { user } = useAuthContext()
    
    return (
        <div className="posts">
            <div className="topic-form-container">
                <div className="topic-container">
                    <div onClick={() => setIsOpen(!isOpen)} className="topic-trigger">
                        <img src={`/images/${topic}.png`} className="topic-icon" alt='topic icon'/>
                        <h2>{topic}</h2>
                        <span className="material-symbols-outlined">{`expand_${isOpen ? 'less' : 'more'}`}</span>
                    </div>
                    {isOpen && <div className={`topic-list ${isOpen ? 'open' : 'closed'}`}>
                    <Topics topic={topic} changeTopic={changeTopic}/>
                    </div>}
                </div>
                {user && <PostForm topic={topic} />}
            </div>
            {posts && posts.map(post => (
                <Post key={post._id} post={post} topic={topic} />
            ))}
        </div>
    )
}

const Topics = ({topic, changeTopic}) => {
    return (
        <div className="sidebar">
            <button className="sidebar-button" style={{fontWeight: topic === "General" ? "bold" : "normal"}} onClick={() => changeTopic("General")}><img src="/images/General.png" className="sidebar-icon" alt="topic icon"/>General</button>
            <button style={{fontWeight: topic === "Career" ? "bold" : "normal"}} onClick={() => changeTopic("Strength")}><img src="/images/Career.png" className="sidebar-icon" alt="topic icon"/>Strength</button>
            <button style={{fontWeight: topic === "Culture" ? "bold" : "normal"}} onClick={() => changeTopic("Endurance")}><img src="/images/Culture.png" className="sidebar-icon" alt="topic icon"/>Endurance</button>
            <button style={{fontWeight: topic === "News" ? "bold" : "normal"}} onClick={() => changeTopic("Bodybuilding")}><img src="/images/News.png" className="sidebar-icon" alt="topic icon"/>Bodybuilding</button>
            <button style={{fontWeight: topic === "Politics" ? "bold" : "normal"}} onClick={() => changeTopic("Athletics")}><img src="/images/Politics.png" className="sidebar-icon" alt="topic icon"/>Athletics</button>
            <button style={{fontWeight: topic === "Social" ? "bold" : "normal"}} onClick={() => changeTopic("Running")}><img src="/images/Social.png" className="sidebar-icon" alt="topic icon"/>Running</button>
            <button style={{fontWeight: topic === "Sports" ? "bold" : "normal"}} onClick={() => changeTopic("HIIT")}><img src="/images/Sports.png" className="sidebar-icon" alt="topic icon"/>HIIT</button>
        </div>
    )
}

export default Posts