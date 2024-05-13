import { Link } from 'react-router-dom';
import React from "react";
import { Button, Card } from "flowbite-react";
import { enrollCourse, addToCart } from "./enrollCourse";
import { useAuthContext } from "../hooks/useAuthContext";

const CourseCard2 = ({ course }) => {

    const product = [];

    const { user } = useAuthContext();
    const userId = user.user.userId;
    const email = user.user.email;
    const contact = user.user.contact;

    const handleBuyNow = async (course) => {

        const productInfo = {
            userId: userId,
            email: email,
            courseId: course._id,
            courseName: course.name,
            price: course.price,
        };


        console.log("Buy Now - Product Info:", productInfo);
        product.push(productInfo);
        console.log("Product:", product);
        await enrollCourse(userId, email, productInfo.courseId, contact);
    };

    const handleAddToCart = async (course) => {
        console.log(`Course ID: ${course._id} - Add to Cart`);
        await addToCart(userId, course._id);
    };

    return (
        <>

            <div className="col-lg-6 course_col p-0" style={{ padding: "15rem" }} >
                <div className="course" >
                    <div className="course_image" style={{ marginTop: "-5rem" }}>     
                            <img style={{ height: "18rem", width: "40rem" }} src={`http://localhost:4002/${course.file}`} alt="" />       
                    </div>
                    <div className="course_body">
                        <h3 className="course_title">
                            <a href="course.html">{course.name}</a>
                        </h3>
                        {/* <div className="course_teacher">Mr. John Taylor</div> */}
                        <div className="course_text">
                            <p style={{ height: "5rem", width: "30rem" }}>
                                {course.description}
                            </p>
                        </div>
                    </div>
                    <div className="course_footer" style={{ marginBottom: "-5rem" }}>
                        <div className="course_footer_content d-flex flex-row ">
                            <div className="course_price ml-1">
                                <div className="shopping_cart" style={{ marginLeft: '1rem' }} onClick={() => handleAddToCart(course)} >
                                    <i className="fa fa-shopping-cart" />
                                </div>
                            </div>
                            <a className="course_price ml-12" style={{ marginLeft: '6rem' }} onClick={() => handleBuyNow(course)}>Enroll</a>
                            <div className="course_price ml-auto">{course.price} LKR</div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default CourseCard2;