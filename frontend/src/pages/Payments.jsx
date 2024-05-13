import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuthContext(); // Destructure user from the hook result
    const email = user.user ? user.user.email : user.email;
    // Ensure user is defined before accessing its properties
    const role = user && user.user && user.user.role;
    useEffect(() => {

        const fetchPayments = async () => {
            try {
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
                console.error("Error fetching payments:", error);
            }
        };


        fetchPayments();
    }, [email]); // Include email in the dependency array to trigger useEffect when email changes

    return (
        <div style={{marginTop:"13rem"}}>
            <div className="search-bar-container">
                <div className="mb-4 relative">
                    <input
                        type="text"
                        placeholder="Search by payment ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button className="search-button">Search</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {payments.filter(payment => payment.paymentId.toLowerCase().includes(searchTerm.toLowerCase())).map((payment) => (
                    <div key={payment._id} className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-2">Payment ID: {payment.paymentId}</h3>
                        <p className="text-gray-600 mb-2">Total Amount: {payment.totalAmount}</p>
                        <p className="text-gray-600 mb-2">Currency: {payment.currency}</p>
                        <p className="text-gray-600 mb-2">Description: {payment.description}</p>
                        <p className="text-gray-600">Email: {payment.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Payments;
