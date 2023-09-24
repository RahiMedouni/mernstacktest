import { useState } from "react";
import { useAdminSignup } from "../hooks/useAdminSignup"; // Import the useAdminSignup hook

const SignupAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { adminSignup, error, isLoading } = useAdminSignup(); // Use the useAdminSignup hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the adminSignup function for admin signup
    await adminSignup(email, password);
  };

  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h3>Admin Sign Up</h3>

      <label>Email address:</label>
      <input
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Sign up as Admin</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default SignupAdmin;
