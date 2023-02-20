import { useEffect, useState } from 'react'
import { usePostsContext } from '../hooks/usePostsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useWindowWidth } from '../hooks/useWindowWidth'
import Navbar from '../components/Navbar'
import Posts from '../components/Posts'
import Workouts from '../components/Workouts'


const Home = () => {
    const {dispatch} = usePostsContext()
    const width = useWindowWidth()
    const [topic, setTopic] = useState("General")
    const [isOpen, setIsOpen] = useState(false)
    const [collapsed, setCollapsed] = useState(false)
    const [tab, setTab] = useState('forum')

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/posts')
            const json = await response.json()
            
            if (response.ok) {
                dispatch({type: 'SET_POSTS', payload: json})
            }
        }

        fetchPosts()
    }, [dispatch])

    if (width >= 800 && collapsed) {
        setCollapsed(false)
    }
    if (width < 800 && !collapsed) {
        setCollapsed(true)
    }

    const changeTopic = async (newTopic) => {
        setTopic(newTopic)

        const response = await fetch(`/api/posts/${newTopic.toLowerCase()}`)
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'SET_POSTS', payload: json})
        }

        setIsOpen(!isOpen)
    }

    return (
        <div className="homepage">
            <Navbar />
            {width < 800 && 
            <div className='toggle-buttons'>
                <div onClick={() => setTab('forum')} className={`toggle-button ${tab === 'forum' && 'selected'}`}>Forum</div>
                <div onClick={() => setTab('workouts')} className={`toggle-button ${tab === 'workouts' && 'selected'}`}>Workouts</div>
            </div>
            }
            <div className='posts-and-workouts-container'>
                {(!collapsed || (collapsed && tab === 'forum')) && <Posts topic={topic} changeTopic={changeTopic} isOpen={isOpen} setIsOpen={setIsOpen} />}
                {(!collapsed || (collapsed && tab === 'workouts')) && <Workouts/>}
            </div>
        </div>
    )
}

export default Home