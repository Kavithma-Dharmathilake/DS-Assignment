import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState ,useEffect} from "react"
// import { useCoursesContext } from "../../hooks/useCoursesContext"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { useAuthContext } from "../../hooks/useAuthContext";


const UpdateCourse = () => {


    // const { dispatch } = useCoursesContext()

    const { id } = useParams('')
    console.log(id)

    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [courseCode, setcourseCode] = useState('')
    const [duration, setDuration] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [files, setFile] = useState(null)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const { user } = useAuthContext();
    const [teacher,setTeacher] = useState('')
   
   
    useEffect(() => {
        const fetchCourse = async() => {

            fetch(`http://localhost:4002/api/courses/${id}`)

            .then(response => response.json())
            .then(data => {
                console.log(data)
                setName(data.name)
                setcourseCode(data.courseCode)
                setDuration(data.duration)
                setPrice(data.price)
                setDescription(data.description)
                setFile(data.files)
                setTeacher(data.teacher)
                setEmptyFields([])
            })
            .catch(error => {
                console.log(error)
            })
        }
        fetchCourse()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const course = {name, courseCode, duration, description, files,price,teacher}

        const response = await fetch(`http://localhost:4002/api/courses/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            console.log('Course updated.', json)
            navigate('/mycourses')
        }
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

export default UpdateCourse;