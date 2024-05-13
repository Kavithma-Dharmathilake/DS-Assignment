import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Button } from 'flowbite-react';
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css';
import SoloAlert from 'soloalert';

const MyCourses = () => {

    const navigate = useNavigate();
    const { user } = useAuthContext();

    const addnew = () => {
        navigate('/addnewcourse');
    }


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
                    const response = await fetch(`http://localhost:4002/api/courses/teacher/${user.user.userId}`);
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

    const handleClick = async (course) => {
        const response = await fetch("http://localhost:4002/api/courses/" + course._id, {
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

                    <Link className="nav-link" style={{ color: "white" }} to="/trainerdash">
                        Dashobard
                    </Link>

                    <Link className="nav-link" style={{ color: "white" }} to="/mycourses">
                        My Courses
                    </Link>

                    <Link className="nav-link" style={{ color: "white" }} to="/trainerdash">
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
                    <Link to="/addnewcourse">


                        <a onClick={addnew} className="btn btn-primary btn-icon-split m-3" style={{ width: "11rem", padding: "0" }}>
                            <span onClick={addnew} className="icon text-white-50">
                            <i className="fa fa-plus" />
                            </span>

                            <span onClick={addnew} className="text" style={{ color: "white" }}>Add New Course</span>
                        </a>
                    </Link>

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
                                            <th>Caption</th>
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
                                                <td>
                                                <img style={{ height: "10rem", width: "13rem" }} src={`http://localhost:4002/${course.file}`} alt="" /></td>
                                                <td>{course.duration}</td>
                                                <td>{new Date(course.createdAt).toISOString().split('T')[0]}</td>
                                                <td>{course.price}</td>
                                                <td>{course.status}</td>
                                                <td> <Link to={`/content/${course._id}`}  className="btn btn-primary m-1 text-white">Add Content</Link></td>
                                                <td>
                                                   <Link  to={`/updatecourse/${course._id}`}><i className="fa fa-pencil" style={{color:"green", fontSize:20, marginLeft:20}}/></Link>
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
        </div>



    </>);
}

export default MyCourses;