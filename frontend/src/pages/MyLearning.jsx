import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button } from "flowbite-react";
import { unEnroll } from "../components/enrollCourse";
import CourseCard from "../components/CourseCard";
import { Navigate, useNavigate, Link } from "react-router-dom";

const MyLearning = () => {
  const navigate = useNavigate();
  const PORT = 8084;
  const { user } = useAuthContext();
  const userId = user.user.userId;
  const email = user.user.email;
  const contact = user.user.contact;
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const getMyLernings = async () => {
      try {
        const response = await fetch(
          `http://localhost:${PORT}/api/enroll/${userId}/myLernings`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log("My enrollments: ", data);
        setMyCourses(data);
      } catch (error) {
        console.error("Error in myLearnings:", error);
      }
    };

    getMyLernings();
  }, [PORT, userId]);

  const handleUnenroll = async (course) => {
    console.log(course);
    await unEnroll(userId, email, course, contact);
    window.location.reload();
  };

  return (
    <div className="text-center mt-48" style={{}}>
      <div className="text-3xl ">MyLearning</div>
      <table
        className="table table-bordered"
        style={{width:"70rem", marginLeft:"10rem"}}
        id="dataTable"
        width="100%"
        cellSpacing={0}
      >
        <thead>
          <tr>
            <th>CourseName</th>
            <th>View Course</th>
            <th>Unenroll</th>

          </tr>
        </thead>

        <tbody >
          {myCourses.map((course, index) => (
            <tr key={index}>
              <td>{course.courseName}</td>
              <td>
                <Link to={`/onecourse/${course.courseId}`}>
                   View Content
                   </Link>
              </td>
              <td>
                <Button 
                style={{backgroundColor:"#14bdee"}}
                onClick={() => handleUnenroll(course.courseId)}>
                  Unenroll
                </Button>
              </td>

            </tr>
          ))}




        </tbody>
      </table>
      {/* // <div key={index} className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-12">
        //   <div className="rounded-lg bg-slate-300 shadow sm:col-span-3">
        //     {course.courseName}
        //   </div>
        //   <div className="rounded-lg bg-slate-300 shadow sm:col-span-6">
        //     <Button onClick={() => handleUnenroll(course.courseId)}>
        //       Unenroll
        //     </Button>
        //   </div>
        // </div>




      ))} */}
    </div>
  );
};

export default MyLearning;
