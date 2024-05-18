import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Button } from 'flowbite-react';
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css';
import SoloAlert from 'soloalert';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';

const AllStudents = () => {

    const navigate = useNavigate();
    const { user } = useAuthContext();

    console.log(user);

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // const addcontent = (id) => {
    //     navigate('/addcontent/'+id);
    // }
    useEffect(() => {

        const fetchCourses = async () => {
            if (user && user.user && user.user.userId) {
                try {
                    // Fetch courses from the given URL
                    const response = await fetch(`http://localhost:4003/api/user/getstu`);
                    const json = await response.json();


                    // Update the state with the fetched courses if the response is successful
                    if (response.ok) {
                        setCourses(json);
                        console.log(courses);
                    } else {
                        console.error('Failed to fetch courses:', response.statusText);
                    }
                } catch (error) {
                    console.error('Failed to fetch courses:', error);
                } finally {
                    // Set loading to false once data fetching is complete
                    setLoading(false);
                }
            };
        }
        fetchCourses();
    }, []);

    const handleClick = async (user) => {
        const response = await fetch("http://localhost:4003/api/user/deleteuser/" + user._id, {
            method: "DELETE",
        });
        const json = await response.json();
        console.log("response ",response)

        if (response.ok) {
            
          toast("User deleted successfully")
          
        }
        navigate('/admindash')

    };
    
    const handleDeleteConfirmation = (event,course) => {
        event.preventDefault(); 
        SoloAlert.confirm({
            title: "Delete Confirmation",
            body: "Are you sure you want to delete this User?",
            icon: "warning",
            theme: "light",
            onOk: () => handleClick(course),
            onCancel: () => {}, // Do nothing when canceled
        });
    };


  


    return (<>
        <div id="wrapper" style={{ marginTop: "3rem" }} >
            {/* Sidebar */}
            <ul
                    className="navbar-nav  sidebar "
                    style={{ backgroundColor: "#14bdee" }}
                  >


                    {/* Nav Item - Dashboard */}
                    <li className="nav-item active">

                        <Link className="nav-link" style={{ color: "white" }} to="/admindash">
                            Dashobard
                        </Link>

                        <Link className="nav-link" style={{ color: "white" }} to="/allcourses">
                            All Courses
                        </Link>

                        <Link className="nav-link" style={{ color: "white" }} to="/adminpayments">
                            Payments
                        </Link>

                        <Link className="nav-link" style={{ color: "white" }} to="/allteachers">
                           Techers
                        </Link>
                        <Link className="nav-link" style={{ color: "white" }} to="/allstudents">
                           Students
                        </Link>
                        <Link className="nav-link" style={{ color: "white" }} to="/adminrequests">
                           Requests
                        </Link>
                    </li>
                

                    {/* Divider */}
                    <hr className="sidebar-divider" />
                </ul>

            <div id="content-wrapper" className="d-flex flex-column" style={{ marginTop: "8rem" }}>
                <>

                    {/* DataTales Example */}
          

                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">All Students</h6><br />


                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table
                                    className="table table-bordered"
                                    id="dataTable"
                                    width="100%"
                                    cellSpacing={0}
                                >
                                    <thead>
                                        <tr>
                                            <th>UserID</th>
                                          
                                            <th>Email</th>
                                            <th>Contact</th>
                                            <th>Address</th>
                                            <th>Actions</th>
                                            {/* <th>Send Email</th> */}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {courses.map((course, index) => (
                                            <tr key={index}>
                                                <td>{course.userId} </td>
                                               
                                                <td>{course.email}</td>
                                               
                                                <td>{course.contact}</td>
                                                <td>{course.address}</td>
                                                <td>
                                            
                                                   <a href="#"  onClick={(event) => handleDeleteConfirmation(event, course)} ><i className="fa fa-trash" style={{color:"red", fontSize:20, marginLeft:20}} /></a>
                                                  
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                </>

            </div>
            {/* End of Content Wrapper */}

            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
             />
        </div>



    </>);
}

export default AllStudents;