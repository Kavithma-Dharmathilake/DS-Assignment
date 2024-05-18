import { Link, useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const Admindashboard = () => {
    const [studentCount, setStudentCount] = useState(null);
    const [courseCount, setCourseCount] = useState(null);
    const [teacherCount, setTeacherCount] = useState(null);
    const [allPayments, setAllPayments] = useState(null);
    const { user } = useAuthContext();
    const email = user.user ? user.user.email : user.email;
    const role = user && user.user && user.user.role;
   

    useEffect(() => {
    const fetchdata = async () => {
                const response2 = await axios.get(`http://localhost:4003/api/user/getstu`);
                setStudentCount(response2.data.length);
                //console.log(response2)

                const response = await axios.get(`http://localhost:4002/api/courses/`);
                setCourseCount(response.data.length);
                console.log(response)

                const response3 = await axios.get(`http://localhost:4003/api/user/getinst`);
                setTeacherCount(response3.data.length);
                console.log(response3)



                const body = {
                    role,email
                };
                const response4 = await fetch("http://localhost:3000/getPayments", {
                    method: "POST", // Change method to POST
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                });
                const data = await response4.json();
                console.log("data :",data)

                const total = data.reduce((acc,item) => acc + item.totalAmount,0)
                console.log("Total",total)
                setAllPayments(total);
  }

    fetchdata();
},[]);


    return (<>

        <>
            {/* Page Wrapper */}
            <div id="wrapper" style={{ marginTop: "1rem" }} >
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
                                                        Teachers
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {teacherCount}
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
                                                        <div className="col">
                                                           
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-clipboard-list fa-2x text-gray-300" />
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
                                                       Payments
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        RS. {allPayments}
                                                    </div>
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
                                                Course Overview
                                            </h6>
                                            <div className="dropdown no-arrow">
                                                <a
                                                    className="dropdown-toggle"
                                                    href="#"
                                                    role="button"
                                                    id="dropdownMenuLink"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                                                </a>
                                                <div
                                                    className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                                    aria-labelledby="dropdownMenuLink"
                                                >
                                                    <div className="dropdown-header">Dropdown Header:</div>
                                                    <a className="dropdown-item" href="#">
                                                        Action
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Another action
                                                    </a>
                                                    <div className="dropdown-divider" />
                                                    <a className="dropdown-item" href="#">
                                                        Something else here
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Card Body */}
                                        <div className="card-body">
                                            <div className="chart-area">
                                                <canvas id="myAreaChart" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Pie Chart */}
                                <div className="col-xl-4 col-lg-5">
                                    <div className="card shadow mb-4">
                                      
                                        {/* Card Body */}
                                        <div className="card-body" style={{height:"25rem"}}>
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

export default Admindashboard;