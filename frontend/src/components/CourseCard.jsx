import { Link } from 'react-router-dom';
import React from "react";
import { Button, Card } from "flowbite-react";
import { enrollCourse, addToCart } from "../components/enrollCourse";
import { useAuthContext } from "../hooks/useAuthContext";
import StripeCheckout from "react-stripe-checkout";

const CourseCard = ({ course }) => {

    const product = [];

    const { user } = useAuthContext();
    const userId = user.user.userId;
    const email = user.user ? user.user.email : user.email;
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

    const makePayment = (token) => {
        const body = {
            token,
            products : course,
            email
        }
        const headers = {
            "Content-Type": "application/json"
        }
        return fetch("http://localhost:3000/singlePayment", {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then((response) => {
            console.log(response);
            alert("Payment successful!");
            handleBuyNow(course);
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleAddToCart = async (course) => {
        console.log(`Course ID: ${course._id} - Add to Cart`);
        await addToCart(userId, course._id);
    };

    return (
        <>

            <div className="col-lg-6 course_col p-0" style={{ padding: "15rem" }} >
                <div className="course" >
                    <div className="course_image" style={{ marginTop: "-5rem" }}>
                        {/* <Link to={`/onecourse/${course._id}`}> */}
                            <img style={{ height: "18rem", width: "40rem" }} src={`http://localhost:4002/${course.file}`} alt="" />
                        {/* </Link> */}
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
                            {/* <a className="course_price ml-12" style={{ marginLeft: '6rem' }} onClick={() => handleBuyNow(course)}>Enroll</a> */}
                            <StripeCheckout
                                name="Purchase Courses"
                               
                                amount={course.price * 100} // Total amount of all products
                                currency="LKR"
                                token={makePayment}
                                stripeKey="pk_test_51PE7P8P6kZHWcO3DPf9VpD13iwvH8B6Zax0ljGMf0QUTlI84oOYWEwD88jl7YWrk6owbqf7Iwg6xlTjKK7ih3cGk00yKHt5HiQ"
                            >
                                <button  style={{marginLeft:"7rem"}}>Enroll Me</button>
                            </StripeCheckout>
                            
                            <div className="course_price ml-auto">{course.price} LKR</div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default CourseCard;