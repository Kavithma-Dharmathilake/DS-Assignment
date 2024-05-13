import '../assets/styles/bootstrap4/bootstrap.min.css';
import '../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css';
import '../assets/plugins/colorbox/colorbox.css';
import '../assets/plugins/OwlCarousel2-2.2.1/owl.carousel.css';
import '../assets/plugins/OwlCarousel2-2.2.1/owl.theme.default.css';
import '../assets/plugins/OwlCarousel2-2.2.1/animate.css';
import '../assets/styles/courses.css';
import '../assets/styles/courses_responsive.css';

// import { useCoursesContext } from "../hooks/useCoursesContext";
import { useEffect, useState } from "react";
import React from "react";
import { Button, Card } from "flowbite-react";
import { enrollCourse, addToCart } from "../components/enrollCourse";
import { useAuthContext } from "../hooks/useAuthContext";


import CourseCard from '../components/CourseCard';


const Courses2 = () => {


    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Fetch courses from the given URL
                const response = await fetch("http://localhost:4002/api/courses");
                const json = await response.json();

                // Update the state with the fetched courses if the response is successful
                if (response.ok) {
                    setCourses(json);
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

        fetchCourses();
    }, []);




    return (
        <div className="courses" style={{ marginTop: "8rem" }}>
            <div className="container">
                <div className="row">
                    {/* Courses Main Content */}
                    <div className="col-lg-10">

                        <div className="courses_container">
                            <div className="row courses_row" style={{ height: "15rem"}}>


                                {loading ? (
                                    // Display a loading indicator while fetching data
                                    <p></p>
                                ) : (
                                    <div className="row courses_row">
                                        {courses.map(course => (
                                            <CourseCard key={course._id} course={course} />

                                        ))}
                                    </div>
                                )}



                            </div>

                        </div>
                    </div>
                    {/* Courses Sidebar */}
                    <div className="col-lg-2">
                        <div className="sidebar">
                            {/* Categories */}
                            <div className="sidebar_section">

                                <div className="sidebar_categories">

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Courses2;