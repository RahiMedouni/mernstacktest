import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [picture, setPicture] = useState(null);
  const [pdf, setPDF] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handlePDFChange = (e) => {
    setPDF(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("load", load);
    formData.append("reps", reps);
    formData.append("picture", picture);
    formData.append("pdf", pdf);

    // Initialize emptyFields as an empty array
    let updatedEmptyFields = [];

    // Check for empty fields including PDF
    if (!title) {
      updatedEmptyFields.push("title");
    }
    if (!load) {
      updatedEmptyFields.push("load");
    }
    if (!reps) {
      updatedEmptyFields.push("reps");
    }
    if (!picture) {
      updatedEmptyFields.push("picture");
    }
    if (!pdf) {
      updatedEmptyFields.push("pdf");
    }

    setEmptyFields(updatedEmptyFields);

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.status === 400) {
      const data = await response.json();
      setError(data.error);
    } else if (response.status === 200) {
      const json = await response.json();
      setTitle("");
      setLoad("");
      setReps("");
      setPicture(null);
      setPDF(null);
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form
      className='create'
      onSubmit={handleSubmit}
      encType='multipart/form-data'>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Load (in kg):</label>
      <input
        type='number'
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Reps:</label>
      <input
        type='number'
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <label>Upload Picture:</label>
      <input
        type='file'
        accept='image/*'
        name='picture'
        onChange={handleFileChange}
      />

      <label>Upload PDF:</label>
      <input
        type='file'
        accept='application/pdf'
        name='pdf'
        onChange={handlePDFChange}
      />

      <button>Add Workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default WorkoutForm;
