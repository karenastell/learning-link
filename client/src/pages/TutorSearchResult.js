import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { AuthContext } from '../AuthContext';
import SideBarMenu from '../components/SideBarMenu';
import Nav from '../components/Nav';

export default function TutorSearchResult(props) {
  // const [results, setResults] = useState(props);

  const { userId, results } = useContext(AuthContext);

  const [readReviewModal, setReadReviewModal] = useState('modal');
  const [tutorReviews, setTutorReviews] = useState([]);
  const [tutorToBeReviewed, setTutorToBeReviewed] = useState('');
  const [tutorAddedMessage, setTutorAddedMessage] = useState('off');

  console.log(userId);

  const history = useHistory();
  const addTutor = (id) => {
    Axios.post('/api/TutorStudent', {
      TutorId: id,
      StudentId: userId,
    }).then((response) => {
      console.log(response.data);
      setTutorAddedMessage('on');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setTimeout(() => {
        setTutorAddedMessage('off');
        history.push('/student-dashboard');
      }, 1500);
    });
  };

  console.log('results tutor search page', results);
  const allTutors = results.filter((result) => result.isTeacher === true);

  console.log(allTutors);

  // https://www.geeksforgeeks.org/how-to-remove-duplicates-from-an-array-of-objects-using-javascript/
  const tutorResults = [...new Map(allTutors.map(item => [JSON.stringify(item), item])).values()];



  console.log('tutor results', tutorResults);
  console.log(results, 'results!!!!!!!!!!!!!!!!!!!!!!!');
  // console.log(results.day);

  // Get the reviews for the tutor that is clicked and display them in the readreview modal
  const handleReadReview = (UserId, name) => {
    Axios.get(`/api/read-reviews/${UserId}`).then((response) => {
      console.log(response.data);
      setTutorReviews(response.data);
    });
    setReadReviewModal('modal is-active');
    setTutorToBeReviewed(name);
  };

  const handleModalClose = () => {
    setReadReviewModal('modal');
  };

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
      <div className="columns">
        <div className="column is-narrow">
          <SideBarMenu />
        </div>
        <div className="mt-6">
          <h1 className="title">Tutor Search Results</h1>
          {tutorAddedMessage === 'on' ? (
            <article class="message is-primary">
              <div class="message-body">
                Tutor has been added to your Dashboard!
              </div>
            </article>
          ) : null}
          {tutorResults.map((result) => (
            <div key={result.lastName} className="card mb-6">
              <header className="card-header">
                <p className="card-header-title">
                  {result.firstName} {result.lastName}
                </p>
              </header>
              <div className="card-content">
                <div className="content">
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
              <footer className="card-footer">
                <a
                  href="#"
                  className="card-footer-item button is-size-7 is-white"
                >
                  Message This Tutor
                </a>
                <button
                  href="#"
                  onClick={() => addTutor(result.UserId)}
                  className="card-footer-item button is-size-7 is-white"
                >
                  Add To Dashboard
                </button>
                <button
                  onClick={() =>
                    handleReadReview(result.UserId, result.firstName)
                  }
                  className="card-footer-item button is-size-7 is-white"
                >
                  See {result.firstName}'s Reviews
                </button>
              </footer>
            </div>
          ))}
        </div>
      </div>

      {/* read reviews Modal */}
      <div className={readReviewModal}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              Reviews for {tutorToBeReviewed}:{' '}
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={handleModalClose}
            ></button>
          </header>
          <section className="modal-card-body">
            {tutorReviews.map((review) => (
              <div key={review.createdAt} className="my-4">
                <p>{review.review}</p>
                <h3>-{review.reviewer}</h3>
              </div>
            ))}
          </section>
          <footer className="modal-card-foot">
            <button className="button" onClick={handleModalClose}>
              Close
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}
