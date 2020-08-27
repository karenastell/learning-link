import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';
import Axios from 'axios';

export default function DashboardCard({ result }) {
  const { isTeacher } = useContext(AuthContext)
  const [modal, setModal] = useState('modal');
  const [review, setReview] = useState({});


  const cardStyle = {
    maxHeight: '200px',
    overflow: 'scroll'
  }

  const activateModal = () => {
    setModal('modal is-active');
  }

  const handleModalClose = () => {
    setModal('modal');
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReview({
      ...review,
      [name]: value,
    });
  };

  const handleReviewSubmit = async () => {
    // post the review
    await Axios.post(`/api/mydashboard/review/${result.id}`, review)
    // make modal disappear
    setModal("modal");
    // reset the review state
    setReview({});
  }

  return (
    <>
    <div className="column is-one-third">
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
                { !isTeacher ? <li>Day(s) Available: {result.days.join(', ')}</li> : null }
                <li>
                  Location: {result.city}, {result.state}
                </li>
                <li>Bio: {result.bio}</li>
                { !isTeacher ? <li>Degree: {result.degree}</li> : <li>Grade: {result.grade}</li>}
                { !isTeacher ? <li>Experience: {result.experience}</li> : <li>My School: {result.school}</li>}
                <li>Subjects: </li>
                <ul>
                  {result.subjects.map((subject) => (
                    <li key={result.lastName + subject}>{subject}</li>
                  ))}
                </ul>
                <li>Delivery Method: {result.delivery_method}</li>
                { result.rate ? <li>Rate: ${result.rate} per hour</li> : null}
              </ul>
            </div>
          </div>
          <footer className='card-footer'>
            <a href='#' className='card-footer-item'>
              Message {result.firstName} {result.lastName}
            </a>
            { !isTeacher ? <a
              href='#'
              onClick={activateModal}
              className='card-footer-item'
            >
              Leave a Review
            </a> : null}
            { !isTeacher ? <a href='#' className='card-footer-item'>
              Remove {result.firstName} {result.lastName} from my Dashboard
            </a> : null}
          </footer>
        </div>
    </div>

       {/* Modal */}
       <div className={modal}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
              <p className="modal-card-title">Write a review for {result.firstName} {result.lastName}</p>
            <button className="delete" aria-label="close" onClick={handleModalClose}></button>
          </header>
          <section className="modal-card-body">
            <textarea className="textarea" name="review" placeholder="Leave your review here..." onChange={handleInputChange}></textarea>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={handleReviewSubmit}>Submit Review</button>
            <button className="button" onClick={handleModalClose}>Cancel</button>
          </footer>
        </div>
      </div>
    </>
  );
}
