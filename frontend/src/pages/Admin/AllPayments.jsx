import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Button } from 'flowbite-react';
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css';
import { toast } from "react-toastify";
import SoloAlert from 'soloalert';
import "react-toastify/dist/ReactToastify.css";

import React from 'react'

function AllPayments() {

    const { user } = useAuthContext();
    
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const email = user.user ? user.user.email : user.email;
    // Ensure user is defined before accessing its properties
    const role = user && user.user && user.user.role;

    useEffect(() =>{
        const fetchPayments = async () => {
            if (user && user.user && user.user.userId){
                try{
                    const body = {
                        role,email
                    };
                    const response = await fetch("http://localhost:3000/getPayments", {
                        method: "POST", // Change method to POST
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(body)
                    });
                    const data = await response.json();
                    setPayments(data);
                } catch (error) {
                    console.error('Failed to fetch payments:', error);
                } finally {
                    // Set loading to false once data fetching is complete
                    setLoading(false);
                }
            };
        }
        fetchPayments();
    }, []);

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
                            <h6 className="m-0 font-weight-bold text-primary">All Payments</h6><br />


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
                                            <th>Payment ID</th>
                                          
                                            <th>Total Amount</th>
                                            <th>Created At</th>
                                            <th>Currency</th>
                                            <th>Description</th>
                                            <th>Email</th>
                                        
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {payments.map((payment, index) => (
                                            <tr key={index}>
                                                <td> {payment.paymentId}</td>
                                               
                                                <td>{payment.totalAmount}</td>
                                                <td>{new Date(payment.createdAt).toISOString().split('T')[0]}</td>
                                                <td>{payment.currency}</td>
                                                <td>{payment.description}</td>
                                                <td>{payment.email}</td>
                                                
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

export default AllPayments
