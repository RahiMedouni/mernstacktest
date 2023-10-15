import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <img
        src={`/uploads/images/${workout.picture}`}
        alt='Workout daily'
        style={{ height: 50, weight: 100 }}
      />
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <iframe
        title='PDF Viewer'
        src={`/uploads/pdfs/${workout.pdf}`} // Update this path based on your backend route
        width='50%'
        height='300'>
        Your browser does not support iframes.
      </iframe>
      <span className='material-symbols-outlined' onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
