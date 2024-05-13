import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react"
// import { useCoursesContext } from "../../hooks/useCoursesContext"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { useAuthContext } from "../../hooks/useAuthContext";


const Addnewcourse = () => {


    // const { dispatch } = useCoursesContext()

    const navigae = useNavigate();

    const [name, setName] = useState('')
    const [courseCode, setcourseCode] = useState('')
    const [duration, setDuration] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const { user } = useAuthContext();
    const teacher = user.user.userId;
   
   

    const handleSubmit = async (e) => {
        e.preventDefault()

        const course = { name, courseCode, duration, description, file, price , teacher}

        let data = new FormData();
        data.append('name', course.name);
        data.append('courseCode', course.courseCode);
        data.append('duration', course.duration);
        data.append('description', course.description);
        data.append('file', course.file)
        data.append('price', course.price)
        data.append('teacher', course.teacher)

      



        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:4002/api/courses',
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(response);
                response.statusCode = 200;
                if (response.status === 200) {
                    // Display a success alert using SweetAlert
                    Swal.fire({
                        icon: 'success',
                        title: 'Course added!',
                        text: 'The new course has been successfully added.',
                        timer: 4000, // Optional: Close the alert after 2 seconds
                    });
                    Navigate('/mycourses')
                }
                
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 400) {
                    toast(error.response.data.error)
                }
            });
    }



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

            <div id="content-wrapper" className="d-flex flex-column" style={{
                marginTop: "8rem", marginLeft: "20rem", width: "40rem"
            }}>
                <>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                        </div>
                        <div className="card-body">
                            <form className="counter_form_content d-flex flex-column" onSubmit={handleSubmit}>
                                <h3>Create a New Course</h3>
                                <br />

                                <lable>Course Name :</lable>
                                <input
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    className={(emptyFields.includes('title') ? 'error' : 'counter_input')}
                                />
                                 <lable>Teacher:</lable>
                                <input
                                    type="text"
                                    value={user.user.userId}
                                    readOnly
                                    className={(emptyFields.includes('title') ? 'error' : 'counter_input')}
                                />

                                <lable>Course Code :</lable>
                                <input
                                    type="text"
                                    onChange={(e) => setcourseCode(e.target.value)}
                                    value={courseCode}
                                    className={emptyFields.includes('courseCode') ? 'error' : 'counter_input'}
                                />

                                <lable>Duration :</lable>
                                <input
                                    type="number"
                                    onChange={(e) => setDuration(e.target.value)}
                                    value={duration}
                                    className={emptyFields.includes('duration') ? 'error' : 'counter_input'}
                                />

                                <lable>Price :</lable>
                                <input
                                    type="number"
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                    className={emptyFields.includes('price') ? 'error' : 'counter_input'}
                                />


                                <lable>Description :</lable>
                                <textarea name="description"
                                    type="text"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    className={emptyFields.includes('description') ? 'error' : 'counter_input'}
                                    style={{ width: "600px", height: "100px", marginBottom: "10px" }}
                                />
                                <label>Thumbnail : </label>
                                <input
                                    type="file"
                                    id="myfile"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    className={emptyFields.includes('file') ? 'error' : ''}
                                    accept="image/*" //only accept image files
                                    name="filename"
                                />

                                <button className="TrainingButton counter_form_button">Create</button>
                                {error && <div className="error">{error}</div>}
                            </form>

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
                    </div>
                </>

            </div>
            {/* End of Content Wrapper */}
        </div>
    </>);
}

export default Addnewcourse;