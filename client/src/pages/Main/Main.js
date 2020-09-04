import React, { useContext, useEffect } from 'react';
import Nav from '../../components/Nav/Nav';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { Redirect } from 'react-router-dom';

import './Main.css';


export default function Main(props) {
const { isAuth, userId} = useContext(AuthContext);

useEffect(() => {
  window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
}, [])

// ternary: if the user is authenticated, they are redirected to their profile page.
  return (
    <>
    { isAuth ? <Redirect to='/student-dashboard' /> : 
    <>
    <Nav />
    <div className="image-div main-body">
      <img src="./coloredpencilscropped.jpg" alt="colored pencils" />
      <div className="container has-text-centered mt-3">
        <div className="container my-5 has-text-centered">
          <h3 className="mb-3 title is-4">Sign up to get started!</h3>
          <Link to="/signup-tutor" className="button-main">
            <button className="button is-info button-main mx-2">
              Sign up as a teacher/tutor
            </button>
          </Link>
          <Link to="/signup-student" className="button-main">
            <button className="button is-info button-main mx-2">
              Sign up a student
            </button>
          </Link>
        </div>
        <p>
          Learning Link connects parents to skilled teachers and tutors to fill
          their child's educational needs. Search among our teachers and tutors
          to find one that is right for you!
          <br />
          <br />
          <strong>For Parents and students:</strong> Sign up to create a profile
          detailing your or your child's needs and search for available tutors.
          You'll be able to view teachers' and tutors' qualifications and
          exeperience, and can contact them to learn more about them or to set
          up a session!
          <br />
          <br />
          <strong>For Teachers and Tutors:</strong> Sign up to create your
          teacher profile and showcase your qualifications, subjects, and
          grades. Communicate with your students' parents
        </p>

        
      </div>
    </div>
      
      </>
}
    </>
  );
}
