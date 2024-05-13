import { useState } from "react";
import { useSignup } from "../hooks/useSignup.jsx";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role is student
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const { signup, error, isLoading } = useSignup();


  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, role, contact, address);
  };

  return (
    <div className="signup" style={{marginTop:"10rem"}}>
      <form onSubmit={handleSubmit}>
        <div className="login-form">
          <div className="neon-container">
            <h3 className="neon_log" data-text="U">Signup</h3>
          </div>
          <div className="image-panel">
            <img src="../signup.jpg"   className="signupImg" alt="" />
          </div>
          <div className="input-group">
            <label>Email address:</label>
            <input className="input-label"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input className="input-label"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="input-group">
            <label>Role:</label>
            <div className="select-wrapper">
              <select
                className="input-label"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>
          </div>

          <div className="input-group" style={{marginTop:"50px"}}>
            <label>Contact Number:</label>
            <input className="input-label"
              type="contactNumber"
              onChange={(e) => setContact(e.target.value)}
              value={contact}
            />
          </div>
          <div className="input-group">
            <label>Address:</label>
            <input className="input-label"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>
          <button disabled={isLoading}
            style={{marginLeft:"0.5rem"}}>SIGN UP</button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default Signup;
