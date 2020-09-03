import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { AuthContext } from '../../AuthContext';
import SideBarMenu from '../../components/SideBarMenu/SideBarMenu';
import Nav from '../../components/Nav/Nav';
import './TutorSearchResult.css';

export default function TutorSearchResult(props) {
  // const [results, setResults] = useState(props);

  const { userId, results } = useContext(AuthContext);

  const [readReviewModal, setReadReviewModal] = useState('modal');
  const [tutorReviews, setTutorReviews] = useState([]);
  const [tutorToBeReviewed, setTutorToBeReviewed] = useState('');
  const [tutorAddedMessage, setTutorAddedMessage] = useState('off');

  console.log(userId);

  useEffect(() => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
  }, [])

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
  const tutorResults = [
    ...new Map(allTutors.map((item) => [JSON.stringify(item), item])).values(),
  ];

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
    <>
      <Nav />
      <div className="columns">
        <div className="column is-narrow side-bar">
          <SideBarMenu />
        </div>
        <div className="column mt-5 search-results-div">
          {tutorResults.length > 0 ? (
            <>
              <h1 className="title">
                Here are the available tutors that match your search:
              </h1>
              <p className="p-2">
                Add a tutor to your dashboard to begin communications and have
                messaging capabilities! Once you add a tutor to your dashboard,
                you will appear on theirs as well and can easily begin
                corresponding. Don't worry, if it is not the right match, you
                can always remove tutors from your dashboard.
              </p>
            </>
          ) : (
            <article className="mt-5 message is-danger">
              <div className="message-body">
                <h3 className="is-size-4">
                  There were no tutors that matched your search criteria.
                </h3>
                <p className="is-size-5">
                  Please, change your criteria and try again.
                </p>
              </div>
            </article>
          )}

          {tutorAddedMessage === 'on' ? (
            <article className="message is-primary">
              <div className="message-body">
                Tutor has been added to your Dashboard!
              </div>
            </article>
          ) : null}
          <div className="container mt-4">
            <div className="columns is-multiline is-centered">
              {tutorResults.map((result) => (
                <div
                  key={result.lastName}
                  className="card search-card-style card-style mb-6 mx-2"
                >
                  <header className="card-header card-head-style">
                    <p className="card-header-title card-text-style">
                      {result.firstName} {result.lastName}
                    </p>
                  </header>
                  <div className="card-content search-card-body">
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
                        {result.rate === null || result.rate === '' ? null : (
                          <li>Rate: {result.rate}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <footer className="card-footer card-foot">
                    <button
                      onClick={() => addTutor(result.UserId)}
                      className="card-footer-item card-buttons button is-size-6 is-white is-info is-light"
                    >
                      Add To Dashboard
                    </button>
                    <button
                      onClick={() =>
                        handleReadReview(result.UserId, result.firstName)
                      }
                      className="card-footer-item card-buttons button is-size-6 is-white is-info is-light"
                    >
                      See {result.firstName}'s Reviews
                    </button>
                  </footer>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* read reviews Modal */}
      <div className={readReviewModal}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head modal-header-style">
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
            {tutorReviews.length > 0 ? (
              tutorReviews.map((review) => (
                <div key={review.createdAt} className="my-4">
                  <p>{review.review}</p>
                  <h3 className="is-pulled-right mr-6">-{review.reviewer}</h3>
                  <hr />
                </div>
              ))
            ) : (
              <p>There are currently no reviews for this tutor...</p>
            )}
          </section>
          <footer className="modal-card-foot modal-bottom-style">
            <button className="button" onClick={handleModalClose}>
              Close
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}
