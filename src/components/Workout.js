import { useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Workout = ({workout}) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const truncateClass = !isExpanded ? "text-truncate" : ""

    if (workout.muscle === 'lower_back') {
        workout.muscle = 'lower back'
    }

    return (
        <Accordion className="workout" id={workout.name}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <div className="workout-name">{workout.name}</div>
                <div className="workout-muscle">{workout.muscle} - {workout.difficulty}</div>
            </AccordionSummary>
            <AccordionDetails>
                <div className={`workout-instructions ${truncateClass}`}>{workout.instructions}</div>
            </AccordionDetails>
        </Accordion>
    )
}

export default Workout