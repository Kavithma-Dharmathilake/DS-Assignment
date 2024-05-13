// Import Bootstrap CSS
import '../assets/styles/bootstrap4/bootstrap.min.css';

// Import Font Awesome CSS
import '../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css';

// // Import Owl Carousel CSS files
// import '../assets/plugins/OwlCarousel2-2.2.1/owl.carousel.css';
// import '../assets/plugins/OwlCarousel2-2.2.1/owl.theme.default.css';
// import '../assets/plugins/OwlCarousel2-2.2.1/animate.css';

// Import main styles and responsive styles
import '../assets/styles/main_styles.css';
import '../assets/styles/responsive.css';

const Testing = () => {

    return (  
   <>

      {/* Home */}
      <div className="super_container" style={{marginTop:"10rem"}}>
      <div className="home" style={{ height: "40rem" }}>
  <div className="home_slider_container">
    {/* Home Slider */}
    <div className="home_slider">
      {/* Home Slider Item */}
      <div>
        <div
          className="home_slider_background"
          style={{ backgroundImage: "url(images/home_slider_1.jpg)" }}
        />
        <img src="./images/home_slider_1.jpg" alt="" />
        <div className="home_slider_content">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <div className="home_slider_title">
                  The Premium System Education
                </div>
                <div className="home_slider_subtitle">
                  Future Of Education Technology
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Features */}
      <div className="features">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section_title_container text-center">
                <h2 className="section_title">Welcome To Unicat E-Learning</h2>
                <div className="section_subtitle">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                    vel gravida arcu. Vestibulum feugiat, sapien ultrices fermentum
                    congue, quam velit venenatis sem
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row features_row">
            {/* Features Item */}
            <div className="col-lg-3 feature_col">
              <div className="feature text-center trans_400">
                <div className="feature_icon ml-20">
                  <img src="images/icon_1.png" alt="" />
                </div>
                <h3 className="feature_title">The Experts</h3>
                <div className="feature_text">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>
              </div>
            </div>
            {/* Features Item */}
            <div className="col-lg-3 feature_col">
              <div className="feature text-center trans_400">
                <div className="feature_icon ml-20">
                  <img src="./images/icon_2.png" alt="" />
                </div>
                <h3 className="feature_title">Book &amp; Library</h3>
                <div className="feature_text">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>
              </div>
            </div>
            {/* Features Item */}
            <div className="col-lg-3 feature_col">
              <div className="feature text-center trans_400">
                <div className="feature_icon  ml-20">
                  <img src="images/icon_3.png" alt="" />
                </div>
                <h3 className="feature_title">Best Courses</h3>
                <div className="feature_text">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>
              </div>
            </div>
            {/* Features Item */}
            <div className="col-lg-3 feature_col">
              <div className="feature text-center trans_400">
                <div className="feature_icon ml-20">
                  <img src="images/icon_4.png" alt="" />
                </div>
                <h3 className="feature_title">Award &amp; Reward</h3>
                <div className="feature_text">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="courses">
        <div
          className="section_background parallax-window"
          data-parallax="scroll"
          data-image-src="images/courses_background.jpg"
          data-speed="0.8"
        />
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section_title_container text-center">
                <h2 className="section_title">Popular Online Courses</h2>
                <div className="section_subtitle">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                    vel gravida arcu. Vestibulum feugiat, sapien ultrices fermentum
                    congue, quam velit venenatis sem
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row courses_row">
    
            <div className="col-lg-4 course_col">
              <div className="course">
                <div className="course_image">
                  <img src="images/course_1.jpg" alt="" />
                </div>
                <div className="course_body">
                  <h3 className="course_title">
                    <a href="course.html">Software Training</a>
                  </h3>
                  <div className="course_teacher">Mr. John Taylor</div>
                  <div className="course_text">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipi elitsed do
                      eiusmod tempor
                    </p>
                  </div>
                </div>
                <div className="course_footer">
                  <div className="course_footer_content d-flex flex-row align-items-center justify-content-start">
                    <div className="course_info">
                      <i className="fa fa-graduation-cap" aria-hidden="true" />
                      <span>20 Student</span>
                    </div>
                    <div className="course_info">
                      <i className="fa fa-star" aria-hidden="true" />
                      <span>5 Ratings</span>
                    </div>
                    <div className="course_price ml-auto">$130</div>
                  </div>
                </div>
              </div>
            </div>
         
            <div className="col-lg-4 course_col">
              <div className="course">
                <div className="course_image">
                  <img src="images/course_2.jpg" alt="" />
                </div>
                <div className="course_body">
                  <h3 className="course_title">
                    <a href="course.html">Developing Mobile Apps</a>
                  </h3>
                  <div className="course_teacher">Ms. Lucius</div>
                  <div className="course_text">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipi elitsed do
                      eiusmod tempor
                    </p>
                  </div>
                </div>
                <div className="course_footer">
                  <div className="course_footer_content d-flex flex-row align-items-center justify-content-start">
                    <div className="course_info">
                      <i className="fa fa-graduation-cap" aria-hidden="true" />
                      <span>20 Student</span>
                    </div>
                    <div className="course_info">
                      <i className="fa fa-star" aria-hidden="true" />
                      <span>5 Ratings</span>
                    </div>
                    <div className="course_price ml-auto">Free</div>
                  </div>
                </div>
              </div>
            </div>
     
            <div className="col-lg-4 course_col">
              <div className="course">
                <div className="course_image">
                  <img src="images/course_3.jpg" alt="" />
                </div>
                <div className="course_body">
                  <h3 className="course_title">
                    <a href="course.html">Starting a Startup</a>
                  </h3>
                  <div className="course_teacher">Mr. Charles</div>
                  <div className="course_text">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipi elitsed do
                      eiusmod tempor
                    </p>
                  </div>
                </div>
                <div className="course_footer">
                  <div className="course_footer_content d-flex flex-row align-items-center justify-content-start">
                    <div className="course_info">
                      <i className="fa fa-graduation-cap" aria-hidden="true" />
                      <span>20 Student</span>
                    </div>
                    <div className="course_info">
                      <i className="fa fa-star" aria-hidden="true" />
                      <span>5 Ratings</span>
                    </div>
                    <div className="course_price ml-auto">
                      <span>$320</span>$220
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="courses_button trans_200">
                <a href="#">view all courses</a>
              </div>
            </div>
          </div>
        </div>
      </div>
 
      <div className="counter">
        <div
          className="counter_background"
          style={{ backgroundImage: "url(images/counter_background.jpg)" }}
        />
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="counter_content">
                <h2 className="counter_title">Register Now</h2>
                <div className="counter_text">
                  <p>
                    Simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry’s standard dumy text ever
                    since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book.
                  </p>
                </div>
             
                <div className="milestones d-flex flex-md-row flex-column align-items-center justify-content-between">
               
                  <div className="milestone">
                    <div className="milestone_counter" data-end-value={15}>
                      0
                    </div>
                    <div className="milestone_text">years</div>
                  </div>
        
                  <div className="milestone">
                    <div
                      className="milestone_counter"
                      data-end-value={120}
                      data-sign-after="k"
                    >
                      0
                    </div>
                    <div className="milestone_text">years</div>
                  </div>
              
                  <div className="milestone">
                    <div
                      className="milestone_counter"
                      data-end-value={670}
                      data-sign-after="+"
                    >
                      0
                    </div>
                    <div className="milestone_text">years</div>
                  </div>
             
                  <div className="milestone">
                    <div className="milestone_counter" data-end-value={320}>
                      0
                    </div>
                    <div className="milestone_text">years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="counter_form">
            <div className="row fill_height">
              <div className="col fill_height">
                <form
                  className="counter_form_content d-flex flex-column align-items-center justify-content-center"
                  action="#"
                >
                  <div className="counter_form_title">courses now</div>
                  <input
                    type="text"
                    className="counter_input"
                    placeholder="Your Name:"
                    required="required"
                  />
                  <input
                    type="tel"
                    className="counter_input"
                    placeholder="Phone:"
                    required="required"
                  />
                  <select
                    name="counter_select"
                    id="counter_select"
                    className="counter_input counter_options"
                  >
                    <option>Choose Subject</option>
                    <option>Subject</option>
                    <option>Subject</option>
                    <option>Subject</option>
                  </select>
                  <textarea
                    className="counter_input counter_text_input"
                    placeholder="Message:"
                    required="required"
                    defaultValue={""}
                  />
                  <button type="submit" className="counter_form_button">
                    submit now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
   
   
      {/* <div className="team">
        <div
          className="team_background parallax-window"
          data-parallax="scroll"
          data-image-src="images/team_background.jpg"
          data-speed="0.8"
        />
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section_title_container text-center">
                <h2 className="section_title">The Best Tutors in Town</h2>
                <div className="section_subtitle">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                    vel gravida arcu. Vestibulum feugiat, sapien ultrices fermentum
                    congue, quam velit venenatis sem
                  </p>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="row team_row">
         
            <div className="col-lg-3 col-md-6 team_col">
              <div className="team_item">
                <div className="team_image">
                  <img src="images/team_1.jpg" alt="" />
                </div>
                <div className="team_body">
                  <div className="team_title">
                    <a href="#">Jacke Masito</a>
                  </div>
                  <div className="team_subtitle">Marketing &amp; Management</div>
                  <div className="social_list">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fa fa-facebook" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-twitter" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-google-plus" aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          
            <div className="col-lg-3 col-md-6 team_col">
              <div className="team_item">
                <div className="team_image">
                  <img src="images/team_2.jpg" alt="" />
                </div>
                <div className="team_body">
                  <div className="team_title">
                    <a href="#">William James</a>
                  </div>
                  <div className="team_subtitle">Designer &amp; Website</div>
                  <div className="social_list">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fa fa-facebook" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-twitter" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-google-plus" aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
 
            <div className="col-lg-3 col-md-6 team_col">
              <div className="team_item">
                <div className="team_image">
                  <img src="images/team_3.jpg" alt="" />
                </div>
                <div className="team_body">
                  <div className="team_title">
                    <a href="#">John Tyler</a>
                  </div>
                  <div className="team_subtitle">Quantum mechanics</div>
                  <div className="social_list">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fa fa-facebook" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-twitter" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-google-plus" aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
        
            <div className="col-lg-3 col-md-6 team_col">
              <div className="team_item">
                <div className="team_image">
                  <img src="images/team_4.jpg" alt="" />
                </div>
                <div className="team_body">
                  <div className="team_title">
                    <a href="#">Veronica Vahn</a>
                  </div>
                  <div className="team_subtitle">Math &amp; Physics</div>
                  <div className="social_list">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fa fa-facebook" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-twitter" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-google-plus" aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        {/* </div>
      </div> */}
  
      </div>
      </>
    
      
    );
}
 
export default Testing;