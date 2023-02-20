import Workout from '../components/Workout'
import {useState, useEffect} from 'react'

const Workouts = () => {
    const [workouts, setWorkouts] = useState([])
    const [formData, setFormData] = useState({
        muscle: "",
        difficulty: ""
    })

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${formData.muscle}&difficulty=${formData.difficulty}`, {
                headers: {
                    'X-Api-Key': 'XUtO/JDl/QIg9GhjDco20A==cweHWrRYahHAL3Kv'
                }
            })
            const json = await response.json()
            setWorkouts(json)
        }

        fetchWorkouts()
    }, [formData])

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    return (
        <div className="workouts">
            <div className="workout-form-container">
                <h2>Workouts</h2>
                <form className="workout-form">
                    <div className="select-container">
                        <label className="workout-label">Muscle group:</label>
                        <select name="muscle" onChange={handleChange} className="select-exercise">
                            <option value="biceps">biceps</option>
                            <option value="triceps">triceps</option>
                            <option value="chest">chest</option>
                            <option value="abdominals">abdominals</option>
                            <option value="lower_back">lower back</option>
                            <option value="quadriceps">quadriceps</option>
                            <option value="hamstrings">hamstrings</option>
                            <option value="glutes">glutes</option>
                        </select>
                    </div>
                    <div className="select-container">
                        <label className="workout-label">Difficulty:</label>
                        <select name ="difficulty" onChange={handleChange} className="select-exercise">
                            <option value="beginner">beginner</option>
                            <option value="intermediate">intermediate</option>
                            <option value="expert">expert</option>
                        </select>
                    </div>
                </form>
            </div>
            {workouts.map(workout => (
                <Workout id={workout.name} workout={workout} />
            ))}
        </div>
    )
}

export default Workouts