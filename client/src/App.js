import React, { useContext } from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import { AuthProvider, AuthContext } from './AuthContext';

import Main from './pages/Main';
import Footer from './components/Footer';
import StudentProfileForm from './pages/StudentProfileForm';
import TutorProfileForm from './pages/TutorProfileForm';
import Search from './pages/Search';
import MyProfile from './pages/MyProfile';
import MyDashboard from './pages/MyDashboard';
import Messages from './pages/Messages';
import Calendar from './pages/Calendar';
import UpdatedProfileMessage from './pages/UpdatedProfileMessage';


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
        isAuth ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  );

  return (
    <>
      
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
            path='/student-dashboard'
            component={MyDashboard}
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

