import React, { useContext } from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import { AuthProvider, AuthContext } from './AuthContext';

import Main from './pages/Main';
import Nav from './components/Nav';
import Footer from './components/Footer';
import StudentProfileForm from './pages/StudentProfileForm';
import TutorProfileForm from './pages/TutorProfileForm';
import Search from './pages/Search';
import MyProfile from './pages/MyProfile';
import TutorDashboard from './pages/TutorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Messages from './pages/Messages';
import Calendar from './pages/Calendar';
import UpdatedProfileMessage from './pages/UpdatedProfileMessage';

// import Home from "./pages/Home";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Members from "./pages/Members";

function App() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  console.log('App auth: ', isAuth);

  // here we are ceating a private route wrapper to prevent front end routing to
  // restricted pages.  The ({ component: Component, ...rest })  argument that is
  // passed to this functional component is essentially the same as just passing
  // props, but using object destucturing.  the ...rest is literally the rest of
  // the props that were not destructured.
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );

  return (
    <>
      <Nav />
      <Router>
        <>
          <Route exact path="/" component={Main} />
          <Route exact path="/signup-tutor" component={TutorProfileForm} />
          <Route exact path="/signup-student" component={StudentProfileForm} />
          <PrivateRoute exact path="/calendar" component={Calendar} />
          <Route exact path="/search" component={Search} />
          <PrivateRoute exact path="/myprofile" component={MyProfile} />
          <PrivateRoute
            exact
            path="/student-dashboard"
            component={StudentDashboard}
          />
          <PrivateRoute
            exact
            path="/tutor-dashboard"
            component={TutorDashboard}
          />
          <PrivateRoute exact path="/messages" component={Messages} />
          <PrivateRoute exact path="/updatemessage" component={UpdatedProfileMessage} />
        </>
      </Router>
      <Footer />
    </>
  );
}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
// Even though this is the App.js file, in the end we are not exactly exporting
// the App component.  We actually set up the app component to implement our react
// router, but in the end we export App wrapped in the context provider

// function App() {
//   // Here we subscribe the authentication context using the useContext hook
//   // we use isAuth to determine whether the user is logged in, and setIsAuth
//   // to change their status on logout.
//   const { isAuth, setIsAuth } = useContext(AuthContext);
//   console.log("App auth: ", isAuth);

//   // here we are ceating a private route wrapper to prevent front end routing to
//   // restricted pages.  The ({ component: Component, ...rest })  argument that is
//   // passed to this functional component is essentially the same as just passing
//   // props, but using object destucturing.  the ...rest is literally the rest of
//   // the props that were not destructured.
//   const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route
//       {...rest}
//       render={props =>
//         isAuth ? <Component {...props} /> : <Redirect to="/login" />
//       }
//     />
//   );

//   return (
//     <Router>
//       <Switch>
//         <Route
//           exact
//           path="/"
//           render={props => <Home {...props} />}
//         />
//         <Route exact path="/login" render={props => <Login {...props} />} />
//         <Route exact path="/signup" render={props => <Signup {...props} />} />
//         <PrivateRoute exact path="/members" component={Members} />
//       </Switch>
//     </Router>
//   );
// }

// // Here we export the final product of our app/context configuration, and
// // even though it is unnamed here, it will be imported as App in index.js
