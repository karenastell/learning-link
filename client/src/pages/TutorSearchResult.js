import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { AuthContext } from '../AuthContext';
import SideBarMenu from '../components/SideBarMenu';
import Nav from '../components/Nav'

export default function TutorSearchResult(props) {
  // const [results, setResults] = useState(props);

  const { userId, results } = useContext(AuthContext);

  console.log(userId);

  const addTutor = (id) => {
    Axios.post('/api/TutorStudent', {
      TutorId: id,
      StudentId: userId,
    }).then((response) => {
      console.log(response.data);
    });
  };

  console.log('results tutor search page', results);
  const allTutors = results.filter((result) => result.isTeacher === true);

  console.log(allTutors);

  // https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
  const tutorResults = Object.values(
    allTutors.reduce((acc, cur) => Object.assign(acc, { [cur.id]: cur }), {})
  );

  console.log('tutor results', tutorResults);
  console.log(results, 'results!!!!!!!!!!!!!!!!!!!!!!!');
  // console.log(results.day);

  return (
    // <div className='mt-6 container'>
    //   <h1 className='title'>Tutor Search Results</h1>
    //  {results.length > 0 ? tutorResults.map((result) => (
    //     <div className='card mb-6'>
    //       <header className='card-header'>
    //         <p className='card-header-title'>
    //           {result.firstName} {result.lastName}
    //         </p>
    //       </header>
    //       <div className='card-content'>
    //         <div className='content'>
    //           <ul>
    //             <li>Email: {result.email}</li>
    //             <li>Day(s) Available: {result.day.join(', ')}</li>
    //             <li>
    //               Location: {result.city}, {result.state}
    //             </li>
    //             <li>Bio: {result.bio}</li>
    //             <li>Degree: {result.degree}</li>
    //             <li>Experience: {result.experience}</li>
    //             <li>Subjects: </li>
    //             <ul>
    //               {result.subject.map((sub) => (
    //                 <li>{sub}</li>
    //               ))}
    //             </ul>
    //             <li>Delivery Method: {result.delivery_method}</li>
    //           </ul>
    //         </div>
    //       </div>
    //       <footer className='card-footer'>
    //         <a
    //           href='#'
    //           onClick={() => addTutor(result.UserId)}
    //           className='card-footer-item'
    //         >
    //           Add Tutor To Your Dashboard
    //         </a>
    //       </footer>
    //     </div>

    // </div>
    <>
      <Nav />
      <div className='columns'>
        <div className='column is-narrow'>
          <SideBarMenu />
        </div>
        <div className='mt-6'>
          <h1 className='title'>Tutor Search Results</h1>
          {tutorResults.map((result) => (
            <div key={result.lastName} className='card mb-6'>
              <header className='card-header'>
                <p className='card-header-title'>
                  {result.firstName} {result.lastName}
                </p>
              </header>
              <div className='card-content'>
                <div className='content'>
                  <ul>
                    <li>Email: {result.email}</li>
                    <li>Day(s) Available: {result.day.join(', ')}</li>
                    <li>
                      Location: {result.city}, {result.state}
                    </li>
                    <li>Bio: {result.bio}</li>
                    <li>Degree: {result.degree}</li>
                    <li>Experience: {result.experience}</li>
                    <li>Subjects: </li>
                    <ul>
                      {result.subject.map((sub) => (
                        <li key={sub}>{sub}</li>
                      ))}
                    </ul>
                    <li>Delivery Method: {result.delivery_method}</li>
                    {result.rate != null ? <li>Rate: {result.rate}</li> : null}
                  </ul>
                </div>
              </div>
              <footer className='card-footer'>
                <a href='#' className='card-footer-item'>
                  Message This Tutor
                </a>
                <a
                  href='#'
                  onClick={() => addTutor(result.UserId)}
                  className='card-footer-item'
                >
                  Add Tutor To Your Dashboard
                </a>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
