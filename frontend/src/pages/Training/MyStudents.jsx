import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Button } from 'flowbite-react';
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css';
import { toast } from "react-toastify";
import SoloAlert from 'soloalert';
import "react-toastify/dist/ReactToastify.css";

const MyStudents = () => {

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

            try {
                // Fetch courses from the given URL
                const response = await fetch(`http://localhost:8084/api/enroll//allenroll`);
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

        fetchCourses();
    }, []);





    return (<>
        <div id="wrapper" style={{ marginTop: "3rem" }} >
            {/* Sidebar */}


            {/* Nav Item - Dashboard */}
            <ul
                className="navbar-nav  sidebar "
                style={{ backgroundColor: "#14bdee" }}
            >


                {/* Nav Item - Dashboard */}
                <li className="nav-item active">

                    <Link className="nav-link" style={{ color: "white" }} to="/trainerdash">
                        Dashobard
                    </Link>

                    <Link className="nav-link" style={{ color: "white" }} to="/mycourses">
                        My Courses
                    </Link>

                    <Link className="nav-link" style={{ color: "white" }} to="/mystudents">
                        My Students
                    </Link>

                    <Link className="nav-link" style={{ color: "white" }} to="/trainerdash">
                        Profile
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
                            <h6 className="m-0 font-weight-bold text-primary">Students Enrolled</h6><br />


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
                                            <th>Student ID</th>


                                            <th>CourseName</th>
                                            <th>Progress</th>
                                            {/* <th>Send Email</th> */}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {courses.map((course, index) => (
                                            <tr key={index}>
                                                <td>{course.userId} </td>
                                                <td>{course.courseName} </td>

                                                <td>{course.outOf}%

                                                    <div>
                                                        <div className="progress">
                                                            <div
                                                                className="progress-bar bg-info"
                                                                role="progressbar"
                                                                style={{ width: `${(course.outOf)}%` }} // Assuming course.outOf is a percentage
                                                                aria-valuenow={(course.outOf)} // Set aria-valuenow dynamically
                                                                aria-valuemin={0}
                                                                aria-valuemax={100}
                                                            />
                                                        </div>
                                                    </div>

                                                </td>

                                                {/* <td> <Link to={`/viewcontent/${course._id}`}  className="btn btn-primary m-1 text-white">View Content</Link></td> */}

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

export default MyStudents;