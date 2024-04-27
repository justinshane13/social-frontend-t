import { useEffect, useState } from 'react'
import { usePostsContext } from '../hooks/usePostsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useWindowWidth } from '../hooks/useWindowWidth'
import Navbar from '../components/Navbar'
import Posts from '../components/Posts'
import Workouts from '../components/Workouts'
import { useWindowScrollPosition } from '../hooks/useWindowScrollPosition'


const Home = () => {
    const {dispatch} = usePostsContext()
    const width = useWindowWidth()
    const scroll = useWindowScrollPosition()
    const [topic, setTopic] = useState("General")
    const [isOpen, setIsOpen] = useState(false)
    const [collapsed, setCollapsed] = useState(false)
    const [tab, setTab] = useState('forum')

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('https://social-backend-t.onrender.com/api/posts')
            const json = await response.json()
            
            if (response.ok) {
                dispatch({type: 'SET_POSTS', payload: json})
            }
        }

        fetchPosts()
    }, [dispatch])

    if (width > 900 && collapsed) {
        setCollapsed(false)
    }
    if (width <+ 900 && !collapsed) {
        setCollapsed(true)
    }

    const changeTopic = async (newTopic) => {
        setTopic(newTopic)

        const response = await fetch(`https://social-backend-t.onrender.com/api/posts/${newTopic.toLowerCase()}`)
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'SET_POSTS', payload: json})
        }

        setIsOpen(!isOpen)
    }

    return (
        <div className="homepage">
            <Navbar tab={tab} setTab={setTab} />
            <div className={`posts-and-workouts-container ${scroll > 50 && width < 900 ? 'marginTop' : ''}  ${width >= 900 ? 'marginTop' : ''}`}>
                {(!collapsed || (collapsed && tab === 'forum')) && <Posts topic={topic} changeTopic={changeTopic} isOpen={isOpen} setIsOpen={setIsOpen} />}
                {(!collapsed || (collapsed && tab === 'workouts')) && <Workouts/>}
            </div>
        </div>
    )
}

export default Home