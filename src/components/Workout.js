import { useState } from 'react'

const Workout = ({workout}) => {
    const [isExpanded, setIsExpanded] = useState(false)
    console.log(workout)

    const truncateClass = !isExpanded ? "text-truncate" : ""

    if (workout.muscle === 'lower_back') {
        workout.muscle = 'lower back'
    }

    return (
        <div className="workout">
            <div className="workout-name">{workout.name}</div>
            <div className="workout-muscle">{workout.muscle} - {workout.difficulty}</div>
            <div className={`workout-instructions ${truncateClass}`}>{workout.instructions}</div>
            <button onClick={() => setIsExpanded(!isExpanded)}><span className="material-symbols-outlined">{`expand_${isExpanded ? 'less' : 'more'}`}</span>See {isExpanded ? 'Less' : 'More'}</button>
        </div>
    )
}

export default Workout