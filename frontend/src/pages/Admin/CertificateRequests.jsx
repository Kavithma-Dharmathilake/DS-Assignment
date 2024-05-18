import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { notifyMail, notifySMS } from "../../components/nofifyCetificate";  

const CertificateRequests = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const userId = user.user.userId;
    const email = user.user.email;
    const contact = user.user.contact;
    const [certificatesRequests, setCertificatesRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCertificateRequests = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/certificate/');
                if (response.status === 200) {
                    setCertificatesRequests(response.data);
                    console.log("Requests:", response.data);
                } else {
                    console.error('Failed to fetch requests:', response.statusText);
                }
            } catch (error) {
                console.error('Failed to fetch requests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCertificateRequests();
    }, []);

    const updateRequestStatus =async (id) => {
        const response = await fetch("http://localhost:4000/api/certificate/accept/" + id, {
            method: "PATCH",
        });
        const json = await response.json();

        if (response.ok) {
           
            toast.warn("Request Accepted successfully!", {
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

        const declinedRequestStatus =async (id) => {
            const response = await fetch("http://localhost:4000/api/certificate/decline/" + id, {
                method: "PATCH",
            });
            const json = await response.json();
    
            if (response.ok) {
               
                toast.warn("Request Accepted successfully!", {
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

    const AcceptCertificate = async (id) => {
        try {
            await notifyMail(
                "Congratulations on your new achievement!",
                "You have successfully claimed the certificate. Check your email and grab your certificate.",
                email,
                userId
            );
            await notifySMS(
                "You have successfully claimed the certificate. Check your email and grab your certificate.",
                contact
            );
            await updateRequestStatus(id);
            toast.success("Accepted Email and SMS have been sent!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/admindash');
        } catch (error) {
            toast.error("Failed to send Email or SMS. Please try again.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error('Error in AcceptCertificate:', error);
        }
    };

    const DeclineCertificate = async (id) => {
        try {
            await notifyMail(
                "Certificate Request Rejected!",
                "Your request for the certificate has been rejected.",
                email,
                userId
            );
            await declinedRequestStatus(id);
        } catch (error) {
            toast.error("Failed to decline the request. Please try again.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error('Error in DeclineCertificate:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div id="wrapper" style={{ marginTop: "3rem" }}>
            <ul className="navbar-nav sidebar" style={{ backgroundColor: "#14bdee" }}>
                <li className="nav-item active">
                    <Link className="nav-link" style={{ color: "white" }} to="/admindash">Dashboard</Link>
                    <Link className="nav-link" style={{ color: "white" }} to="/allcourses">All Courses</Link>
                    <Link className="nav-link" style={{ color: "white" }} to="/adminpayments">Payments</Link>
                    <Link className="nav-link" style={{ color: "white" }} to="/allteachers">Teachers</Link>
                    <Link className="nav-link" style={{ color: "white" }} to="/allstudents">Students</Link>
                    <Link className="nav-link" style={{ color: "white" }} to="/adminrequests">Requests</Link>
                </li>
                <hr className="sidebar-divider" />
            </ul>
            <div id="content-wrapper" className="d-flex flex-column" style={{ marginTop: "8rem" }}>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">All Certificate Requests</h6>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Course Code</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {certificatesRequests.map((request, index) => (
                                        <tr key={index}>
                                            <td>{request.userName}</td>
                                            <td>{request.courseCode}</td>
                                            <td>{request.email}</td>
                                            <td>{request.contact}</td>
                                            <td>{request.status}</td>
                                            <td>
                                                 <button className="btn btn-success m-1 text-white" onClick={() => AcceptCertificate(request._id, request.email, request.contact)}>Accept</button>
                                                <button className="btn btn-warning m-1 text-white" onClick={() => DeclineCertificate(request._id, request.email, request.contact)}>Decline</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateRequests;
