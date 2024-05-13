import { Link, useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';


const Trainerdashboard = () => {

    const [courseCount, setCourseCount] = useState(null);
    const [studentCount, setStudentCount] = useState(null);
    const [accept, setAccept] = useState(null);
    const [pending, setPending] = useState(null)
    const [chart, setChart] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();
    const [chartData, setChartData] = useState({});


    useEffect(() => {
        const fetchCourseCount = async () => {
            try {
                const response = await axios.get(`http://localhost:4002/api/courses/coursecount/${user.user.userId}`);
                setCourseCount(response.data.courseCount);

                const response2 = await axios.get(`http://localhost:4003/api/user/getstu`);
                setStudentCount(response2.data.length);

                const response3 = await axios.get(`http://localhost:4002/api/courses/acceptcount/${user.user.userId}`);
                setAccept(response3.data.length);

                const response5 = await axios.get(`http://localhost:8084/api/enroll//studentpercourse`);
                const data = response5.data;

                const labels = data.map(course => course.courseName);
                const studentCounts = data.map(course => course.studentCount);
                console.log(studentCounts)

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Student Count',
                            data: studentCounts,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }
                    ]
                });


                const response4 = await axios.get(`http://localhost:4002/api/courses/rejectcount/${user.user.userId}`);
                setPending(response4.data.length);

               
              
               

                setLoading(false);
            } catch (error) {
                setError('Error fetching course count');
                setLoading(false);
            }
        };

        fetchCourseCount();
    }, [user.user.userId]);


    return (<>

        <>
            {/* Page Wrapper */}
            <div id="wrapper" style={{ marginTop: "5rem" }} >
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

                <div id="content-wrapper" className="d-flex flex-column" >
                    {/* Main Content */}
                    <div id="content">


                        {/* Begin Page Content */}
                        <div className="container-fluid">
                            {/* Page Heading */}
                            <div className="d-sm-flex align-items-center justify-content-between mb-4" style={{ marginTop: "11rem" }}>


                            </div>
                            {/* Content Row */}
                            <div className="row">
                                {/* Earnings (Monthly) Card Example */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Courses
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {courseCount}
                                                    </div>
                                                </div>
                                                <div className="col-auto">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Earnings (Monthly) Card Example */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-success shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        Accepted Courses
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {accept}
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Earnings (Monthly) Card Example */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-info shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                        Students
                                                    </div>
                                                    <div className="row no-gutters align-items-center">
                                                        <div className="col-auto">
                                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                                                {studentCount}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-auto">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Pending Requests Card Example */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-warning shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                        Pending Courses
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {pending}
                                                    </div>
                                                </div>
                                                <div className="col-auto">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Content Row */}
                            <div className="row">
                                {/* Area Chart */}
                                <div className="col-xl-8 col-lg-7">
                                    <div className="card shadow mb-4">
                                        {/* Card Header - Dropdown */}
                                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-primary">
                                                Course overview
                                            </h6>

                                        </div>
                                        {/* Card Body */}
                                        <div className="card-body">
                                            <div className="chart-area">
                                                {/* <Bar
                                                    data={chartData}
                                                    options={{
                                                        scales: {
                                                            y: {
                                                                beginAtZero: true
                                                            }
                                                        }
                                                    }}
                                                /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Pie Chart */}
                                <div className="col-xl-4 col-lg-5" >
                                    <div className="card shadow mb-4">
                                        {/* Card Header - Dropdown */}

                                        {/* Card Body */}
                                        <div className="card-body" style={{ height: "25rem" }}>
                                            <div className="chart-pie">
                                                <FullCalendar
                                                    plugins={[dayGridPlugin]}
                                                    initialView="dayGridMonth"
                                                />

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* /.container-fluid */}
                    </div>

                </div>
                {/* End of Content Wrapper */}
            </div>



        </>



    </>);
}

export default Trainerdashboard;