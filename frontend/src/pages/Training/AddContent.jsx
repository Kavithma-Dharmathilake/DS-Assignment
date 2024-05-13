import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from "react"
// import { useCoursesContext } from "../../hooks/useCoursesContext"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { useAuthContext } from "../../hooks/useAuthContext";


const AddContent = () => {


    // const { dispatch } = useCoursesContext()

    const navigae = useNavigate();
    const { id } = useParams('');
   

    const [title, setTitle] = useState('')
    const [file, setFile] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const courseContent = {title, file}

        let data = new FormData();
        data.append('title', courseContent.title);
        data.append('file', courseContent.file);
        data.append('courseId', id);

        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: 'http://localhost:4002/api/courseContents',
            data : data
        };

        axios.request(config)
        .then((response) => {
            console.log(response);
            response.statusCode = 200;
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
            // if(error.response && error.response.data && error.response.data.error) {
            //     toast.POSITION(error.response.data.error)
            // }
            if(error.response.status === 400){
                toast(error.response.data.error)
            }
            
        })
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
                                <h3>Add Content</h3>
                                <br />

                                <lable>Title :</lable>
                                <input
                                    type="text"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    className={emptyFields.includes('title') ? 'error' : 'counter_input'}
                                />
                                 <lable>File:</lable>
                                <input
                                    type="file"
                                    id="myfile"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    className={emptyFields.includes('file') ? 'error' : ''}
                                    accept="video/*, application/pdf, application/zip"
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

export default AddContent;