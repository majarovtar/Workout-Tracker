import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import {useAuthContext} from "../hooks/useAuthContext";

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const user = JSON.parse(localStorage.getItem('user'));

            let json
            let response
            try {
                response = await fetch('/api/workouts', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
                json = await response.json()
            } catch (e) {
                console.error(e)
            }


            if (response.ok) {
                console.log('json', json)
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        if (user){
            fetchWorkouts()
        }
    }, [dispatch, user])


    console.log('workouts', workouts)
    if(!workouts) {
        return <div className="loading">Loading...</div>
    }
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map(workout => (
                    <WorkoutDetails workout={workout} key={workout._id} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home