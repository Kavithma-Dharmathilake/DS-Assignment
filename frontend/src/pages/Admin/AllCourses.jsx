import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Button } from 'flowbite-react';
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css';
import { toast } from "react-toastify";
import SoloAlert from 'soloalert';
import "react-toastify/dist/ReactToastify.css";

const AllCourses = () => {

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
                    const response = await fetch(`http://localhost:4002/api/courses/`);
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

    const AcceptCourse = async (id) => {
        const response = await fetch("http://localhost:4002/api/courses/accept/" + id, {
            method: "PATCH",
        });
        const json = await response.json();

        if (response.ok) {
           
            toast.warn("Course Accepted successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }
        navigate('/admindash')
    };

    const RejectCourse = async (id) => {
        const response = await fetch("http://localhost:4002/api/courses/decline/" + id, {
            method: "PATCH",
        });
        const json = await response.json();

        if (response.ok) {
           
            toast.warn("Course declined successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }
        navigate('/admindash')
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
                            <h6 className="m-0 font-weight-bold text-primary">All Coursese</h6><br />


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
                                            <th>Course</th>
                                          
                                            <th>Duration(Hrs)</th>
                                            <th>Created At</th>
                                            <th>Price(LKR)</th>
                                            <th>Status</th>
                                            <th>Content</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {courses.map((course, index) => (
                                            <tr key={index}>
                                                <td>{course.name} -{course.courseCode}</td>
                                               
                                                <td>{course.duration}</td>
                                                <td>{new Date(course.createdAt).toISOString().split('T')[0]}</td>
                                                <td>{course.price}</td>
                                                <td>{course.status}</td>
                                                <td> <Link to={`/viewcontent/${course._id}`}  className="btn btn-primary m-1 text-white">View Content</Link></td>
                                                <td>
                                                  <div  className="btn btn-success m-1 text-white" onClick={() => AcceptCourse(course._id)}>Accept</div>
                                                  <div  className="btn btn-warning m-1 text-white"onClick={() => RejectCourse(course._id)}>Decline</div>
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
        </div>



    </>);
}

export default AllCourses;