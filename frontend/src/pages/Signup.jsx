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
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <div className="login-form">
          <div className="neon-container">
            <h3 className="neon_log" data-text="U">GALAXYPORT</h3>
          </div>
          <div className="">
            <img src="" className="" alt="" />
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
            <select onChange={(e) => setRole(e.target.value)} value={role}>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>

          <div className="input-group">
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
          <button disabled={isLoading}>SIGN UP</button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default Signup;
