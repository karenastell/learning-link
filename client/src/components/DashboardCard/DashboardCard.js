import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../AuthContext';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './DashboardCard.css';

export default function DashboardCard({ result, getMyStudentTutorPairs }) {
  const { isTeacher, userId } = useContext(AuthContext);
  const [reviewModal, setReviewModal] = useState('modal');
  const [review, setReview] = useState({});
  const [reviewer, setReviewer] = useState({});
  const [removeMessage, setRemoveMessage] = useState('modal');
  const [room, setRoom] = useState('');
  const [unread, setUnread] = useState(false);

  const [emptyReviewMessage, setEmptyReviewMessage] = useState('off');

  const [readReviewModal, setReadReviewModal] = useState('modal');

  const [tutorReviews, setTutorReviews] = useState([]);

  useEffect(() => {
    setMessageRoom();
  }, []);

  useEffect(() => {
    checkForUnreadMessages();
    const interval = setInterval(() => {
      checkForUnreadMessages();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const activateModal = () => {
    setReviewModal('modal is-active');
  };

  const handleModalClose = () => {
    setReviewModal('modal');
    setRemoveMessage('modal');
    setEmptyReviewMessage('off');
    setReadReviewModal('modal');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReview({
      [name]: value,
    });
  };
  const handleReviewerInputChange = (event) => {
    const { name, value } = event.target;
    setReviewer({
      ...reviewer,
      [name]: value,
    });
  };

  const handleReviewSubmit = async () => {
    // post the review
    if (!review.review) {
      console.log('Oops, empty box');
      setEmptyReviewMessage('on');
      return;
    }
    const reviewObject = {
      review: review.review,
      reviewer: reviewer.Name,
    };
    await Axios.post(`/api/mydashboard/review/${result.id}`, reviewObject);
    // make modal disappear
    setReviewModal('modal');
    // reset the review state
    setReview({});
    setReviewer({});
    setEmptyReviewMessage('off');
  };

  const handleRemoveModal = () => {
    setRemoveMessage('modal is-active');
  };

  // Get the reviews for the tutor that is clicked and display them in the readreview modal
  const handleReadReview = () => {
    Axios.get(`/api/read-reviews/${result.id}`).then((response) => {
      console.log(response.data);
      setTutorReviews(response.data);
    });
    setReadReviewModal('modal is-active');
  };

  const removeFromDashboard = async () => {
    setRemoveMessage('modal');
    // do a delete where, if isTeacher, the userId from context is the tutor id and the result.id is the student id
    // if !isTeacher the userId from context is the studentid and the result id is tutorid
    await Axios.delete(
      `/api/mydashboard/${userId}/remove/${result.id}/${isTeacher}`
    );

    getMyStudentTutorPairs();
  };

  // set up a room between the user and any tutor/student on their dashboard so that they can message each other
  const setMessageRoom = async () => {
    if (isTeacher) {
      const getRoomInfo = await Axios.get(
        `/api/message-room/tutor${userId}/student${result.id}`
      );
      console.log(getRoomInfo.data.roomInfo);
      setRoom(getRoomInfo.data.roomInfo[0].room);
    } else {
      const getRoomInfo = await Axios.get(
        `/api/message-room/tutor${result.id}/student${userId}`
      );
      console.log(getRoomInfo.data.roomInfo);
      setRoom(getRoomInfo.data.roomInfo[0].room);
    }
  };

  const checkForUnreadMessages = () => {
    Axios.get(`/api/unread/${userId}/${result.id}/${isTeacher}`).then(
      (response) => {
        console.log(response);
        if (response.data.length > 0) {
          setUnread(true);
        }
      }
    );
  };

  console.log(unread);

  return (
    <>
      <div className="column is-half-tablet is-one-third-desktop">
        <div className="card mb-6 card-style">
          <header className="card-header card-head-style">
            <p className="column">
              {result.firstName} {result.lastName}
              <br />
            </p>
            {!isTeacher ? (
              <Link to={`/calendar/tutor/${result.id}`}>
                <img src="./calendar.png" width="50px" className="calendar-button"/>
              </Link>
            ) : null}
          </header>
          <div className="card-content is-size-7-mobile card-body-style">
            <div className="content">
              <ul>
                <li>
                  <span className="bold-span">Email: </span>
                  {result.email}
                </li>
                {!isTeacher ? (
                  <li>
                    <span className="bold-span">Day(s) Available: </span>
                    {result.days.join(', ')}
                  </li>
                ) : null}
                <li>
                  <span className="bold-span">Location: </span>
                  {result.city}, {result.state}
                </li>
                <li>
                  <span className="bold-span">Bio: </span>
                  {result.bio}
                </li>
                {!isTeacher ? (
                  <li>
                    <span className="bold-span">Degree: </span>
                    {result.degree}
                  </li>
                ) : (
                  <li>
                    <span className="bold-span">Grade: </span>
                    {result.grade}
                  </li>
                )}
                {!isTeacher ? (
                  <li>
                    <span className="bold-span">Experience: </span>
                    {result.experience}
                  </li>
                ) : (
                  <li>
                    <span className="bold-span">School: </span>
                    {result.school}
                  </li>
                )}
                {isTeacher ? (
                  <li>
                    <span className="bold-span">
                      Subjects {result.firstName} needs help with:{' '}
                    </span>
                  </li>
                ) : (
                  <li>
                    <span className="bold-span">
                      Subjects {result.firstName} can help with:{' '}
                    </span>
                  </li>
                )}
                <ul>
                  {result.subjects.map((subject) => (
                    <li key={result.lastName + subject}>{subject}</li>
                  ))}
                </ul>
                <li>
                  <span className="bold-span">Delivery Method: </span>
                  {result.delivery_method}
                </li>
                {result.rate ? (
                  <li>
                    <span className="bold-span">Rate: </span>${result.rate} per
                    hour
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
          <footer className="card-footer card-foot">
            <div className="buttons card-buttons">
              {unread === true ? (
                <Link
                  to={`/message?user1=${userId}&user2=${result.id}&room=${room}`}
                  className="card-footer-item card-buttons button is-info is-light is-size-7 is-white"
                  onClick={setMessageRoom}
                >
                  <span className="tag is-danger new-message"> </span> Message{' '}
                  {result.firstName}
                </Link>
              ) : (
                <Link
                  to={`/message?user1=${userId}&user2=${result.id}&room=${room}`}
                  className="card-footer-item card-buttons button is-info is-light is-size-7 is-white"
                  onClick={setMessageRoom}
                >
                  Message {result.firstName}
                </Link>
              )}

              {!isTeacher ? (
                <button
                  onClick={activateModal}
                  className="card-footer-item card-buttons button is-size-7 is-white is-info is-light"
                >
                  Leave a Review
                </button>
              ) : null}
              {!isTeacher ? (
                <button
                  onClick={handleReadReview}
                  className="card-footer-item card-buttons button is-size-7 is-white is-info is-light"
                >
                  See {result.firstName}'s Reviews
                </button>
              ) : null}
              <button
                className="card-footer-item card-buttons button is-size-7 is-white is-info is-light"
                onClick={handleRemoveModal}
              >
                Remove {result.firstName}
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* Write a Review Modal */}
      <div className={reviewModal}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head modal-header-style">
            <p className="modal-card-title">
              Write a review for {result.firstName} {result.lastName}
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={handleModalClose}
            ></button>
          </header>
          <section className="modal-card-body">
            {emptyReviewMessage === 'on' ? (
              <article className="message is-danger">
                <div className="message-body">
                  Oops! You cannon submit an empty review!
                </div>
              </article>
            ) : null}
            <textarea
              className="textarea"
              name="review"
              value={review.review || undefined}
              placeholder="Leave your review here..."
              onChange={handleInputChange}
            ></textarea>
            <div className="field">
              <p className="control is-expanded has-icons-left my-4">
                <label className="label" htmlFor="Name">
                  Your Name
                  <input
                    className="input"
                    id="Name"
                    type="text"
                    placeholder="Your Name"
                    name="Name"
                    onChange={handleReviewerInputChange}
                  />
                </label>
              </p>
            </div>
          </section>
          <footer className="modal-card-foot modal-bottom-style">
            <button className="button is-info" onClick={handleReviewSubmit}>
              Submit Review
            </button>
            <button className="button" onClick={handleModalClose}>
              Cancel
            </button>
          </footer>
        </div>
      </div>

      {/* remove from Dashboard Modal */}
      <div className={removeMessage}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head modal-header-style">
            <p className="modal-card-title">
              You are about to remove {result.firstName} {result.lastName} from
              your Dashboard
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={handleModalClose}
            ></button>
          </header>
          <section className="modal-card-body">
            <p>
              Are you sure you want to remove {result.firstName}{' '}
              {result.lastName} from your dashboard?
            </p>
          </section>
          <footer className="modal-card-foot modal-bottom-style">
            <button className="button is-info" onClick={removeFromDashboard}>
              Yes, I'm sure
            </button>
            <button className="button" onClick={handleModalClose}>
              Cancel
            </button>
          </footer>
        </div>
      </div>

      {/* read reviews Modal */}
      <div className={readReviewModal}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head modal-header-style">
            <p className="modal-card-title">
              Reviews for {result.firstName} {result.lastName}:
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={handleModalClose}
            ></button>
          </header>
          <section className="modal-card-body">
            {tutorReviews[0] ? (
              tutorReviews.map((review) => (
                <div key={review.createdAt} className="my-4 px-2">
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
