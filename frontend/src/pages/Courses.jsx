import React from "react";
import { Button, Card } from "flowbite-react";
import { enrollCourse, addToCart } from "../components/enrollCourse";
import { useAuthContext } from "../hooks/useAuthContext";

const Courses = () => {
  const courses = [
    { courseId: "J2002", price: 1500 },
    { courseId: "DB3010", price: 1000 },
    { courseId: "SE1030", price: 950 },
    { courseId: "BS1030", price: 2950 },
    { courseId: "AF1030", price: 550 },
  ];

  const product = [];

  const { user } = useAuthContext();
  const userId = user.user.userId;
  const email = user.user.email;
  const contact = user.user.contact;

  const handleBuyNow = async (course) => {
    const productInfo = {
      userId: userId,
      email: email,
      courseId: course.courseId,
      courseName: course.courseName,
      price: course.price,
    };

    console.log("Buy Now - Product Info:", productInfo);
    product.push(productInfo);
    console.log("Product:", product);

    await enrollCourse(userId, email, course.courseId, contact);
  };

  const handleAddToCart = async (course) => {
    console.log(`Course ID: ${course.courseId} - Add to Cart`);
    await addToCart(userId, course.courseId);
  };

  return (
    <div className="mx-5">
      <div>Courses</div>
      {courses.map((course, index) => (
        <Card key={index} className="max-w-sm bg-slate-600 my-4">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {course.courseId}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Price: ${course.price}
          </p>
          <Button className="mx-2 my-1" onClick={() => handleBuyNow(course)}>
            Buy Now
          </Button>
          <Button className="mx-2 my-1" onClick={() => handleAddToCart(course)}>
            Add to cart
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default Courses;
