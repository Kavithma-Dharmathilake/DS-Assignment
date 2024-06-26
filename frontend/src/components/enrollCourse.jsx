import { notifyMail, notifySMS } from "./notifyMail";
const PORT = 8084;

//enroll into the course
export const enrollCourse = async (userId, email, courseId, contact) => {
  try {
    const response = await fetch(
      `http://localhost:${PORT}/api/enroll/${userId}/${courseId}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enrollKey: courseId }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      //notify by an email
      await notifyMail(data[0], data[1], email, data[2]);

      //notify by a SMS message
      await notifySMS(data[1], contact);

      //assing the response object to a variable
      console.log("Enroll: " + data);
    } else {
      console.log("Failed to enroll. Status: ", response.status);
    }
  } catch (error) {
    console.error("Error in enroll:", error);
  }
};

//unenroll from a course
export const unEnroll = async (userId, email, courseId, contact) => {
  try {
    //calling the backend method cancelEnrollment()
    const response = await fetch(
      `http://localhost:${PORT}/api/enroll/${userId}/${courseId}/cancel`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      //notify by an email
      await notifyMail(data[0], data[1], email, data[2]);

      //notify by a SMS message
      await notifySMS(data[1], contact);

      //assing the response object to a variable
      console.log("Unenroll: " + data);
    } else {
      console.log("Failed to unenroll. Status: ", response.status);
    }
  } catch (error) {
    console.error("Error in unenroll:", error);
  }
};

//add selected courses to the cart
export const addToCart = async (userId, courseId) => {
  //callinge the backend addToCart()
  try {
    const response = await fetch(
      `http://localhost:8084/api/enroll/addCart/${userId}/${courseId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //assing the response object to a variable
    const data = await response.json();
    console.log("addToCart: " + data.courseName);
  } catch (error) {
    console.error("Error in addToCart:", error);
  }
};

export const removeCartItem = async (userId, courseId) => {
  //calling the backend removeCart()
  try {
    const response = await fetch(
      `http://localhost:8084/api/enroll/remove/${userId}/${courseId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    //assing the response object to a variable
    const data = await response.json();
    console.log("removeCartItem: " + data.courseName);
  } catch (error) {
    console.error("Error in removeCartItem:", error);
  }
};

export const getProgress = async (userId, courseId, count, outOf) => {
  console.log(`getProgress--- ${userId}, ${courseId}, ${count},${outOf}`);
  try {
    //calling the backend method trackProgress()
    const response = await fetch(
      `http://localhost:8084/api/enroll/myProgress/${userId}/${courseId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count: count, outOf: outOf }), // Corrected 'outOf'
      }
    );

    //assing the response object to a variable
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getProgress:", error);
  }
};

export const showProgress = async (userId, courseId) => {
  try {
    //calling the backend method getProgress()
    const response = await fetch(
      `http://localhost:8084/api/enroll//getProgress/${userId}/${courseId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    //assing the response object to a variable
    const data = await response.json();
    console.log(`showProgress ${data}`);
    return data;
  } catch (error) {
    console.error("Error in getProgress:", error);
  }
};
