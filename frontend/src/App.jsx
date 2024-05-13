import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext.jsx";
import "./index.css";
import Navbar from "./components/Navbar.jsx";
import Navbar2 from "./components/Navbar2.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

import Testing from './pages/Testing.jsx';
import OneCourse from './pages/OneCourse.jsx';
import Courses2 from './pages/Courses2.jsx';

import MyLearning from "./pages/MyLearning.jsx";
import Courses from "./pages/Courses.jsx";
import MyCart from "./pages/MyCart.jsx";


import Trainerdashboard from './pages/Training/Trainerdashboard.jsx';
import MyCourses2 from './pages/Training/MyCourses.jsx';
import Addnewcourse from './pages/Training/Addnewcourse.jsx';
import Content from "./pages/Training/Content.jsx";
import AddContent from "./pages/Training/AddContent.jsx";
import UpdateCourse from "./pages/Training/UpdateCourse.jsx";
import MyStudents from "./pages/Training/MyStudents.jsx";


import Admindashboard from "./pages/Admin/Admindashboard.jsx";
import AllCourses from "./pages/Admin/AllCourses.jsx";
import ViewContent from "./pages/Admin/ViewContent.jsx";
import AllTeachers from "./pages/Admin/AllTeachers.jsx";
import AllStudents from "./pages/Admin/AllStudents.jsx";

import Payments from "./pages/Payments.jsx";
import Profile from "./pages/MyProfile";

MyLearning;
function App() {
  const { user } = useAuthContext();

  return (
    <Router>

      <Navbar2 />
      <Routes>

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/enrollment"
          element={user ? <MyLearning /> : <Navigate to="/login" />}
        />
        {/* <Route
          path="/"
          element={user ? <Courses /> : <Navigate to="/login" />}
        /> */}
        <Route
          path="/cart"
          element={user ? <MyCart /> : <Navigate to="/login" />}
        />

        <Route path="/" element={user ? <Testing /> : <Navigate to="/login" />} />
        {/* <Route path="/onecourse/:id" element={<OneCourse />} />
        <Route path='/courses' element={<Courses2 />} />

        <Route path='/trainerdash' element={<Trainerdashboard />} />
        <Route path='/mycourses' element={<MyCourses2 />} />
        <Route path='/addnewcourse' element={<Addnewcourse />} />
        <Route path='/content/:id' element={<Content />} />
        <Route path='/addcontent/:id' element={<AddContent />} />
        <Route path='/updatecourse/:id' element={<UpdateCourse />} />
        <Route path='/mystudents/' element={<MyStudents />} />

        <Route path='/admindash' element={<Admindashboard />} />
        <Route path='/allcourses' element={<AllCourses />} />
        <Route path='/viewcontent/:id' element={<ViewContent />} />
        <Route path='/allteachers' element={<AllTeachers />} />
        <Route path='/allstudents' element={<AllStudents />} /> */}

        <Route path="/onecourse/:id" element={user ? <OneCourse /> : <Navigate to="/login" />} />
        <Route path="/courses" element={user ? <Courses2 /> : <Navigate to="/login" />} />

        <Route path="/trainerdash" element={user ? <Trainerdashboard /> : <Navigate to="/login" />} />
        <Route path="/mycourses" element={user ? <MyCourses2 /> : <Navigate to="/login" />} />
        <Route path="/addnewcourse" element={user ? <Addnewcourse /> : <Navigate to="/login" />} />
        <Route path="/content/:id" element={user ? <Content /> : <Navigate to="/login" />} />
        <Route path="/addcontent/:id" element={user ? <AddContent /> : <Navigate to="/login" />} />
        <Route path="/updatecourse/:id" element={user ? <UpdateCourse /> : <Navigate to="/login" />} />
        <Route path="/mystudents/" element={user ? <MyStudents /> : <Navigate to="/login" />} />

        <Route path="/admindash" element={user ? <Admindashboard /> : <Navigate to="/login" />} />
        <Route path="/allcourses" element={user ? <AllCourses /> : <Navigate to="/login" />} />
        <Route path="/viewcontent/:id" element={user ? <ViewContent /> : <Navigate to="/login" />} />
        <Route path="/allteachers" element={user ? <AllTeachers /> : <Navigate to="/login" />} />
        <Route path="/allstudents" element={user ? <AllStudents /> : <Navigate to="/login" />} />


        <Route path="/payments" element={user ? <Payments /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />


        <Route
          path="/dashboard"
          element={
            user ? (
              user.user.role === 'admin' ? (
                <Admindashboard />
              ) : (
                <Trainerdashboard />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />



      </Routes>
      {/* </div>
      </div> */}
    </Router>
  );
}

export default App;
