import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function DashboardCard({ result }) {
  const { isTeacher, userId } = useContext(AuthContext);
  const [reviewModal, setReviewModal] = useState('modal');
  const [review, setReview] = useState({});
  const [reviewer, setReviewer] = useState({});
  const [removeMessage, setRemoveMessage] = useState('modal');
  const [room, setRoom] = useState('');

  const [emptyReviewMessage, setEmptyReviewMessage] = useState('off');

  useEffect(() => {
    setMessageRoom();
  }, []);

  const cardStyle = {
    maxHeight: '200px',
    overflow: 'scroll',
  };

  const activateModal = () => {
    setReviewModal('modal is-active');
  };

  const handleModalClose = () => {
    setReviewModal('modal');
    setRemoveMessage('modal');
    setEmptyReviewMessage('off');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReview({
      ...review,
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

  const removeFromDashboard = () => {
    setRemoveMessage('modal');
    // do a delete where, if isTeacher, the userId from context is the tutor id and the result.id is the student id
    Axios.delete(`/api/mydashboard/${userId}/remove/${result.id}/${isTeacher}`);
    // if !isTeacher the userId from context is the studentid and the result id is tutorid
  };

  const setMessageRoom = async() => {
    if (isTeacher) {
      const getRoomInfo = await Axios.get(
        `/api/message-room/tutor${userId}/student${result.id}`
      );
      console.log(getRoomInfo.data);
      setRoom(getRoomInfo.data[0].room);
    } else {
      const getRoomInfo = await Axios.get(
        `/api/message-room/tutor${result.id}/student${userId}`
      );
      console.log(getRoomInfo.data);
      setRoom(getRoomInfo.data[0].room);
    }
  };

  return (
    <>
      <div className='column is-one-third'>
        <div className='card mb-6'>
          <header className='card-header'>
            <p className='card-header-title'>
              {result.firstName} {result.lastName}
            </p>
          </header>
          <div style={cardStyle} className='card-content is-size-7'>
            <div className='content'>
              <ul>
                <li>Email: {result.email}</li>
                {!isTeacher ? (
                  <li>Day(s) Available: {result.days.join(', ')}</li>
                ) : null}
                <li>
                  Location: {result.city}, {result.state}
                </li>
                <li>Bio: {result.bio}</li>
                {!isTeacher ? (
                  <li>Degree: {result.degree}</li>
                ) : (
                  <li>Grade: {result.grade}</li>
                )}
                {!isTeacher ? (
                  <li>Experience: {result.experience}</li>
                ) : (
                  <li>My School: {result.school}</li>
                )}
                <li>Subjects: </li>
                <ul>
                  {result.subjects.map((subject) => (
                    <li key={result.lastName + subject}>{subject}</li>
                  ))}
                </ul>
                <li>Delivery Method: {result.delivery_method}</li>
                {result.rate ? <li>Rate: ${result.rate} per hour</li> : null}
              </ul>
            </div>
          </div>
          <footer className='card-footer'>
            <Link
              to={`/message?user1=${userId}&user2=${result.id}&room=${room}`}
              className='card-footer-item button is-size-7 is-white'
              onClick={setMessageRoom}
            >
              Message {result.firstName} {result.lastName}
            </Link>

            {!isTeacher ? (
              <button
                onClick={activateModal}
                className='card-footer-item button is-size-7 is-white'
              >
                Leave a Review
              </button>
            ) : null}
            <button
              className='card-footer-item button is-size-7 is-white'
              onClick={handleRemoveModal}
            >
              Remove {result.firstName}
            </button>
          </footer>
        </div>
      </div>

      {/* Review Modal */}
      <div className={reviewModal}>
        <div className='modal-background'></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>
              Write a review for {result.firstName} {result.lastName}
            </p>
            <button
              className='delete'
              aria-label='close'
              onClick={handleModalClose}
            ></button>
          </header>
          <section className='modal-card-body'>
            {emptyReviewMessage === 'on' ? (
              <article className='message is-danger'>
                <div className='message-body'>
                  Oops! You cannon submit an empty review!
                </div>
              </article>
            ) : null}
            <textarea
              className='textarea'
              name='review'
              placeholder='Leave your review here...'
              onChange={handleInputChange}
            ></textarea>
            <div className='field'>
              <p className='control is-expanded has-icons-left my-4'>
                <label className='label' htmlFor='Name'>
                  Your Name
                  <input
                    className='input'
                    id='Name'
                    type='text'
                    placeholder='Your Name'
                    name='Name'
                    onChange={handleReviewerInputChange}
                  />
                </label>
              </p>
            </div>
          </section>
          <footer className='modal-card-foot'>
            <button className='button is-success' onClick={handleReviewSubmit}>
              Submit Review
            </button>
            <button className='button' onClick={handleModalClose}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
      {/* remove Modal */}
      <div className={removeMessage}>
        <div className='modal-background'></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>
              You are about to remove {result.firstName} {result.lastName} from
              your Dashboard
            </p>
            <button
              className='delete'
              aria-label='close'
              onClick={handleModalClose}
            ></button>
          </header>
          <section className='modal-card-body'>
            <p>
              Are you sure you want to remove {result.firstName}{' '}
              {result.lastName} from your dashboard?
            </p>
          </section>
          <footer className='modal-card-foot'>
            <button className='button is-success' onClick={removeFromDashboard}>
              Yes, I'm sure
            </button>
            <button className='button' onClick={handleModalClose}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}
