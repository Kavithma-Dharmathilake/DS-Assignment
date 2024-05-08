import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext.jsx'
import "./index.css";
import Navbar from "./components/Navbar.jsx";

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'


function App() {
  const { user } = useAuthContext()
  return (
    <Router>
      <div className="bg-container">
        
        <div className="bg-nav-container">
          <Navbar />
        </div>
        
        <div className="app-container">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}



export default App;


