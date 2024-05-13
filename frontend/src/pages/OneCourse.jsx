import "../assets/styles/bootstrap4/bootstrap.min.css";
import "../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css";
import "../assets/plugins/colorbox/colorbox.css";
import "../assets/plugins/OwlCarousel2-2.2.1/owl.carousel.css";
import "../assets/plugins/OwlCarousel2-2.2.1/owl.theme.default.css";
import "../assets/plugins/OwlCarousel2-2.2.1/animate.css";
import "../assets/styles/course.css";
import "../assets/styles/course_responsive.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { getProgress, showProgress } from "../components/enrollCourse";

const OneCourse = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [course, setCourse] = useState("");
  const [courseContents, setCourseContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseResponse = await fetch(
          `http://localhost:4002/api/courses/${id}`
        );
        const courseData = await courseResponse.json();

        const contentsResponse = await fetch(
          `http://localhost:4002/api/courseContents/${id}`
        );
        const contentsData = await contentsResponse.json();

        if (courseResponse.ok && contentsResponse.ok) {
          setCourse(courseData);
          setCourseContents(
            contentsData.map((content) => ({
              ...content,
              isChecked: getCheckedStatus(content._id),
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching course details and contents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
    showProgress(user.user.userId, id).then(setProgress);
  }, [id, 
    user.user.userId
  ]);

  // Function to handle checkbox change
  const handleCheckboxChange = (event, index) => {
    const isChecked = event.target.checked;
    const newCourseContents = [...courseContents];
    newCourseContents[index].isChecked = isChecked;
    setCourseContents(newCourseContents);
    updateLocalStorage(newCourseContents);
    calculateProgress();
  };

  // Function to calculate progress based on checked checkboxes
  const calculateProgress = () => {
    const checkedCount = courseContents.filter(
      (content) => content.isChecked
    ).length;
    const progress = (checkedCount / courseContents.length) * 100;
    setProgress(progress);
    getProgress(user.user.userId, id, checkedCount, courseContents.length);
  };

  // Function to update local storage with the state of checkboxes
  const updateLocalStorage = (contents) => {
    localStorage.setItem(`courseContents_${id}`, JSON.stringify(contents));
  };

  // Function to get the checked status of a checkbox from local storage
  const getCheckedStatus = (contentId) => {
    const storedContents = JSON.parse(
      localStorage.getItem(`courseContents_${id}`)
    );
    if (storedContents) {
      const content = storedContents.find((item) => item._id === contentId);
      return content ? content.isChecked : false;
    }
    return false;
  };

  const renderMedia = (lecture) => {
    const file = lecture.file;
    if (file.endsWith(".pdf")) {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <a href={`http://localhost:4002/${file}`} download>
            <button className="TrainingButton" style={{ margin: "0 auto" }}>
              Download Note
            </button>
          </a>
        </div>
      );
    } else if (file.endsWith(".zip")) {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <a href={`http://localhost:4002/${file}`} download>
            <button className="TrainingButton" style={{ margin: "0 auto" }}>
              Download Quiz
            </button>
          </a>
        </div>
      );
    } else if (
      file.endsWith(".mp4") ||
      file.endsWith(".webm") ||
      file.endsWith(".3gpp")
    ) {
      return (
        <video
          src={`http://localhost:4002/${file}`}
          alt="Lecture Video"
          style={{ height: 250 }}
          controls
        />
      );
    }
  };

  return (
    <>
      <>
        {/* Course */}
        <div className="course">
          <div className="container" style={{ marginTop: "10rem" }}>
            <div className="row">
              {/* Course */}
              <div className="col-lg-8">
                <div className="course_container">
                  <div className="course_title">{course.name}</div>
                  <div className="course_info d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
                    {/* Course Info Item */}
                    {/* <div className="course_info_item">
                      <div className="course_info_title">Teacher:</div>
                      <div className="course_info_text">
                        <a href="#">Jacke Masito</a>
                      </div>
                    </div> */}
                    {/* Course Info Item */}
                    <div className="course_info_item">
                      <div className="course_info_title">Price:</div>
                      <div className="course_info_text">
                        <a href="#">
                          {" "}
                          <div className="course_price">{course.price} LKR</div>
                        </a>
                      </div>
                    </div>
                    {/* Course Info Item */}
                    <div className="course_info_item">
                      <div className="course_info_title">Lectures:</div>
                      <div className="course_info_text">
                        <a href="#">{course.duration}</a>
                      </div>
                    </div>
                    <div className="course_info_item">
                      <div className="course_info_title">Progress:</div>
                      <div className="course_info_text">
                        <a href="#">{progress}%</a>
                      </div>
                    </div>
                  </div>
                  {/* Course Image */}
                  <div className="course_image">
                    <img src={`http://localhost:4002/${course.file}`} alt="" />
                  </div>
                  {/* Course Tabs */}
                  <div className="course_tabs_container">
                    <div className="tabs d-flex flex-row align-items-center justify-content-start">
                      <div className="tab active">description and Curriculum</div>
                    
                    </div>
                    <div className="tab_panels">
                      {/* Description */}
                      <div className="tab_panel active">
                        <div className="tab_panel_title">{course.name}</div>
                        <div className="tab_panel_content">
                          <div className="tab_panel_text">
                            <p>{course.description}</p>
                            <ul className="dropdowns">
                              {loading ? (
                                <p>Loading course contents...</p>
                              ) : (
                                courseContents.map((content, index) => (
                                  <li key={content._id}>
                                    <div className="dropdown_item">
                                      <div className="dropdown_item_title">
                                        <input
                                          type="checkbox"
                                          onChange={(event) =>
                                            handleCheckboxChange(event, index)
                                          }
                                          checked={content.isChecked}
                                        />
                                        <span>{`Lecture ${index + 1}: ${
                                          content.title
                                        }`}</span>
                                      </div>
                                      <div className="dropdown_item_text">
                                        {renderMedia(content)}
                                      </div>
                                    </div>
                                  </li>
                                ))
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* Curriculum */}
                      <div className="tab_panel tab_panel_2">
                        <div className="tab_panel_content">
                          <div className="tab_panel_title">{course.name}</div>
                          <div className="tab_panel_content">
                            {/* Dropdowns */}
                            <ul className="dropdowns">
                              {loading ? (
                                <p>Loading course contents...</p>
                              ) : (
                                courseContents.map((content, index) => (
                                  <li key={content._id}>
                                    <div className="dropdown_item">
                                      <div className="dropdown_item_title">
                                        <input
                                          type="checkbox"
                                          onChange={(event) =>
                                            handleCheckboxChange(event, index)
                                          }
                                          checked={content.isChecked}
                                        />
                                        <span>{`Lecture ${index + 1}: ${
                                          content.title
                                        }`}</span>
                                      </div>
                                      <div className="dropdown_item_text">
                                        {renderMedia(content)}
                                      </div>
                                    </div>
                                  </li>
                                ))
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Course Sidebar */}
              <div className="col-lg-4">
                <div className="sidebar">
                  {/* Feature */}
                  <div className="sidebar_section">
                    {/* <div className="sidebar_section_title">Teacher</div> */}
                    <div className="sidebar_teacher">
                      <div className="teacher_title_container d-flex flex-row align-items-center justify-content-start">
                        <div className="teacher_image">
                          {/* <img src="../images/teacher.jpg" alt="" /> */}
                        </div>
                        <div className="teacher_title">
                          <div className="teacher_name">
                            {/* <a href="#">Jacke Masito</a> */}
                          </div>
                          <div className="teacher_position">
                            {/* Marketing &amp; Management */}
                          </div>
                        </div>
                      </div>

                      <div className="teacher_info">
                        {/* <p> */}
                          {/* Hi! I am Masion, I’m a marketing &amp; management eros
                          pulvinar velit laoreet, sit amet egestas erat
                          dignissim. Sed quis rutrum tellus, sit amet viverra
                          felis. Cras sagittis sem sit amet urna feugiat rutrum
                          nam nulla ipsum.
                        </p> */}
                      </div>
                    </div>
                  </div>
                  {/* Latest Course */}
                  <div className="sidebar_section"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default OneCourse;
