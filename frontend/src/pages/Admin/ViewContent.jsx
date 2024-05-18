import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Button } from 'flowbite-react';
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css';
import { toast } from "react-toastify";
import SoloAlert from 'soloalert';
import "react-toastify/dist/ReactToastify.css";


const ViewContent = () => {

    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { id } = useParams();


    const addnewcontent = () => {
        navigate('/addcontent/'+id);
    }


    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmedDeletion, setConfirmedDeletion] = useState(false);

    const renderMedia = (course) => {
        const file = course.file;
        if (file.endsWith('.pdf')) {
            return (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <a href={`http://localhost:4002/${file}`} download>
                        <button className="TrainingButton" style={{ margin: "0 auto" }}>Download Note</button>
                    </a>
                </div>
            )
        } else if (file.endsWith('.zip')) {
            return (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <a href={`http://localhost:4002/${file}`} download>
                        <button className="TrainingButton" style={{ margin: "0 auto" }}>Download Quiz</button>
                    </a>
                </div>
            )
        } else if (file.endsWith('.mp4') || file.endsWith('.webm') || file.endsWith('.3gpp')) {
            return (
                <video
                    src={`http://localhost:4002/${file}`}
                    alt="Lecture Video"
                    style={{ height: 250 }}
                    controls
                />
            )
        }
    }
    useEffect(() => {
        
        const fetchCourses = async () => {
            if (user.user.userId && !confirmedDeletion) {
                try {
                    // Fetch courses from the given URL
                    const response = await fetch(`http://localhost:4002/api/courseContents/${id}`);
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
    }, [id, confirmedDeletion]);


    const handleClick = async (course) => {
        const response = await fetch("http://localhost:4002/api/courseContents/" + course._id, {
            method: "DELETE",
        });
        const json = await response.json();

        if (response.ok) {
            setConfirmedDeletion(true);
            toast.warn("Course deleted successfully!", {
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
        navigate('/mycourses')
    };

    const handleDeleteConfirmation = (event,course) => {
        event.preventDefault(); 
        SoloAlert.confirm({
            title: "Delete Confirmation",
            body: "Are you sure you want to delete this Lecture?",
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
                    </li>
                

                    {/* Divider */}
                    <hr className="sidebar-divider" />
                </ul>

            <div id="content-wrapper" className="d-flex flex-column" style={{ marginTop: "8rem" }}>
                <>

                    {/* DataTales Example */}
               



                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Course Contents</h6><br />


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
                                            <th>Title</th>
                                            <th>Content</th>
                                            <th>Created At</th>
                                       
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {courses.map((course, index) => (
                                            <tr key={index}>
                                                <td>{course.title}</td>
                                                <td>{renderMedia(course)}</td>

                                                <td>{new Date(course.createdAt).toISOString().split('T')[0]}</td>

                                              
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

export default ViewContent;