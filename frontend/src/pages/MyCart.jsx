import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useAuthContext } from "../hooks/useAuthContext";
import { removeCartItem, enrollCourse } from "../components/enrollCourse";
import StripeCheckout from "react-stripe-checkout";
const PORT = 8084;

const MyCart = () => {
  const { user } = useAuthContext();
  const userId = user.user.userId;
  const email = user.user ? user.user.email : user.email;
  const contact = user.user.contact;
  const [myCart, setMyCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setSelectedCourses] = useState([]);

  useEffect(() => {
    const getMyCartItem = async () => {
      try {
        const response = await fetch(
          `http://localhost:${PORT}/api/enroll/myCart/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("My Cart: ", data);
        setMyCart(data);
      } catch (error) {
        console.error("Error in getMyCartItem:", error);
      }
    };

    getMyCartItem();
  }, [PORT, userId]);

  const handleCheckboxChange = (event, price, courseId, courseName) => {
    const isChecked = event.target.checked;
    const coursePrice = isChecked ? price : -price;
    setTotal((prevTotal) => prevTotal + coursePrice);
    if (isChecked) {
      setSelectedCourses((prevCourses) => [
        ...prevCourses,
        { courseId: courseId, price: price, courseName: courseName },
      ]);
    } else {
      setSelectedCourses((prevCourses) =>
        prevCourses.filter((course) => course.courseId !== courseId)
      );
    }
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
      email
    }
    const headers = {
      "Content-Type": "application/json"
    }
    return fetch("http://localhost:3000/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then((response) => {
      console.log(response);
      alert("Payment successful!");
      handleCheckout();
    }).catch((err) => {
      console.log(err);
    });
  }


  const handleCheckout = async (total) => {
    console.log(`Checkout: ${total}`);
    console.log("Selected Course Ids:");
    products.forEach(async (course, index) => {
      console.log(`${course.courseName},${course.courseId},${course.price}`);
      await enrollCourse(userId, email, course.courseId, contact);
      await removeCartItem(userId, course.courseId);
    });
  };

  const handleRemoveItem = async (courseId) => {
    console.log(`Removing ${userId} - ${courseId}`);
    await removeCartItem(userId, courseId);
    // After removing the item, refetch the cart items
    const response = await fetch(
      `http://localhost:${PORT}/api/enroll/myCart/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setMyCart(data);
  };

  return (
    <div className="text-center mx-5 flex flex-col justify-between h-full" style={{marginTop:"10rem"}}  >
      <div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Select
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Course Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Remove
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {myCart.map((cart, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="h-6 w-6 mr-8 rounded-lg"
                    onChange={(event) =>
                      handleCheckboxChange(
                        event,
                        cart.price,
                        cart.courseId,
                        cart.courseName
                      )
                    }
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {cart.courseName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{cart.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    style={{backgroundColor:"#14bdee"}}
                    onClick={() => handleRemoveItem(cart.courseId)}
                    className="mx-2 my-1"
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end mr-4">
        <div className="mr-4">Total: ${total}</div>
        {/* <Button onClick={() => handleCheckout(total)} className="mx-2 my-4">
          Checkout
        </Button> */}
        <StripeCheckout
      
          name="Purchase Courses"
          amount={total * 100} // Total amount of all products
          currency="LKR"
          token={makePayment}
          stripeKey="pk_test_51PE7P8P6kZHWcO3DPf9VpD13iwvH8B6Zax0ljGMf0QUTlI84oOYWEwD88jl7YWrk6owbqf7Iwg6xlTjKK7ih3cGk00yKHt5HiQ"
        >
          <button>Pay Total Amount: {total}</button>
        </StripeCheckout>

      </div>
    </div>
  );
};

export default MyCart;
