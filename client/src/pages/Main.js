import React from 'react';
import axios from 'axios';

export default function Main(props) {

  return (
    <>
      <img src="./coloredpencils.jpg" alt="learning image" />
      <div className="container has-text-centered mt-3" >
        <p>
          Learning Link connects parents to skilled teachers and tutors to fill
          their child's educational needs. Search among our teachers and tutors
          to find one that is right for you!
          <br/><br/>
          <strong>For Parents and students:</strong> Sign up to create a profile detailing your or your child's needs and search for available tutors.  You'll be able to view teachers' and tutors' qualifications and exeperience, and can contact them to learn more about them or to set up a session!
          <br/><br/>
          <strong>For Teachers and Tutors:</strong>  Sign up to create your teacher profile and showcase your qualifications, subjects, and grades.  Communicate with your students' parents
        </p>

        <div class="container my-5 has-text-centered">
          <h3 className="mb-3 title is-4">Sign up to get started!</h3>
          <button className="button is-primary mx-2">Sign up as a teacher/tutor</button>
          <button className="button is-primary mx-2">Sign up as a parent</button>
        </div>
      </div>
    </>
  );
}
