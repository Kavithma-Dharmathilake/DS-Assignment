import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { ImCross } from 'react-icons/im';
import '../App.css';

const Navbar2 = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const [pressed, setPress] = useState(false);

  const handleClick = () => {
    logout()
  }

  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <div >
      {/* Header */}
      <header className="header">
        {/* Top Bar */}
        <div className="top_bar">
          <div className="top_bar_container">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="top_bar_content d-flex flex-row align-items-center justify-content-start">
                    <ul className="top_bar_contact_list" style={{ padding: '5rem' }}>
                      <li>
                        <div style={{ marginLeft: '5rem', padding: '5rem' }} className="question" >Have any questions?</div>
                      </li>
                      <li>
                        <i className="fa fa-phone" aria-hidden="true" />
                        <div>001-1234-88888</div>
                      </li>
                      <li>
                        <i className="fa fa-envelope-o" aria-hidden="true" />
                        <div>info.deercreative@gmail.com</div>
                      </li>
                    </ul>
                    {user && (
                      <>

                        <span style={{ color: "white" }}>Welcome to UniCat! {user.user.email}</span>

                      </>

                    )}


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Header Content */}
        <div className="header_container">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="header_content d-flex flex-row align-items-center justify-content-start">
                  <div className="logo_container">
                    <a href="#">
                      <div className="logo_text">
                        Unic<span>at</span>
                      </div>
                    </a>
                  </div>
                  <nav className="main_nav_contaner ml-auto">
                    <ul className="main_nav" style={{ marginleft: "30px" }} >
                      <li >
                        <a href="/">
                          <Link to="/">
                            Home
                          </Link></a>
                      </li>

                      <li>
                        <Link to="/courses">Courses</Link>
                      </li>
                      <li>
                        <Link to="/enrollment">

                          My Learning

                        </Link>
                      </li>
                      <li>
                        <Link to="/cart">
                          <i className="fa fa-shopping-cart" />


                        </Link>
                      </li>


                      <li>
                        <Link to="/payments">
                          Payments


                        </Link>

                      </li>
                      <li>

                        {user != null && user.user.role !== 'student' && (
                          <Link to="/dashboard">
                            Dashboard


                          </Link>
                        )}



                      </li>
                      <li>
                        {user && (
                          <div>
                            <span>{user.email}</span>
                            <Link to="/profile">
                              <img src="/prof-icon.jpg" alt="Profile" className="h-8 w-8 cursor-pointer" />
                            </Link>

                          </div>
                        )}
                      </li>
                      <li>
                        {user && (
                          <div >

                            <button onClick={handleClick}>Log out</button>
                          </div>
                        )}
                      </li>

                      <li>
                        {!user && (
                          <div>
                            <Link to="/login">
                              <button>
                                Login
                              </button>
                            </Link>
                            </div>
                        )}
                        </li><li>

                            {!user && (
                              <div>
                            <Link to="/signup">
                              <button>
                                SignUp
                              </button>
                            </Link>
                          </div>
                        )}
                      </li>


                    </ul>


                  </nav>

                </div>
              </div>
            </div>
          </div>
        </div>

      </header>
    </div>


  );
}
export default Navbar2
