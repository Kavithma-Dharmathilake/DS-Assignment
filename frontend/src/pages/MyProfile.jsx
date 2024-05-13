import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const MyProfile = () => {
    const { user } = useAuthContext();
    const email = user && user.user && user.user.email;
    const [userData, setUserData] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const body = {
                    email
                };
                const response = await fetch("http://localhost:4003/api/user/getUserData", {
                    method: "POST", // Change method to POST
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                });
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

            fetchUserData();
    }, [email]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestBody = {
                email: email, // Include the email in the request body
                contact: userData.contact, // Include the updated contact
                address: userData.address // Include the updated address
            };

            await axios.put("http://localhost:4003/api/user/update", requestBody);
            setSuccessMessage("User data updated successfully");
            // Optionally show a success message or redirect to another page
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    return (
        <div className="container mx-auto mt-10 flex justify-center" style={{marginTop:"10rem"}}>
            <div className="w-full max-w-md bg-gray-200 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{successMessage}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-black-50 font-bold">Email</label>
                        <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} className="form-input mt-1 block w-full text-lg" readOnly />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-black-50 font-bold">Role</label>
                        <input type="text" id="role" name="role" value={userData.role} onChange={handleChange} className="form-input mt-1 block w-full text-lg" readOnly />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contact" className="block text-gray-700 font-bold">Contact</label>
                        <input type="text" id="contact" name="contact" value={userData.contact} onChange={handleChange} className="form-input mt-1 block w-full text-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-700 font-bold">Address</label>
                        <textarea id="address" name="address" value={userData.address} onChange={handleChange} className="form-textarea mt-1 block w-full text-lg"></textarea>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MyProfile;
