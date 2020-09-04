import React, { useState, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Axios from 'axios';
import SideBarMenu from '../components/SideBarMenu/SideBarMenu';
import Nav from '../components/Nav/Nav';
import { AuthContext } from '../AuthContext';

export default function Calendar(props) {
  const [emptyReviewMessage, setEmptyReviewMessage] = useState('off');
  const [readReviewModal, setReadReviewModal] = useState('modal');
  const [removeMessage, setRemoveMessage] = useState('modal');
  const [reviewModal, setReviewModal] = useState('modal');
  const { userId } = useContext(AuthContext);
  const [session, setSession] = useState([]);

  const handleDateToUTC = () => {
    if (session.date && session.startTime && session.endTime) {
      const utcDateTime = new Date(
        `${session.date} ${session.startTime}`
      ).toISOString();
      const utcDateTime2 = new Date(
        `${session.date} ${session.endTime}`
      ).toISOString();
      setSession({
        ...session,
        utcEndTime: utcDateTime2,
        utcStartTime: utcDateTime,
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSession({
      ...session,
      [name]: value,
    });
  };

  const handleModalClose = () => {
    setReviewModal('modal');
    setRemoveMessage('modal');
    setEmptyReviewMessage('off');
    setReadReviewModal('modal');
  };

  const handleReadReview = () => {
    setReadReviewModal('modal is-active');
  };

  const handleBookSession = async () => {
    await handleDateToUTC();
    Axios.post(`api/calendar/tutor/:tutorId/student/${userId}`, {
      event: `Tutoring Session with ${session.studentName}`,
      start: session.utcStartTime,
      end: session.utcEndTime,
    }).then((response)=>{
      console.log('session has been booked', response);
      handleModalClose();
    })
  };

  return (
    <>
      <Nav />
      <div className='columns'>
        <div className='column is-narrow side-bar'>
          <SideBarMenu />
        </div>
        <div className='container column'>
          <button
            className='button is-light is-info'
            onClick={handleReadReview}
          >
            Add An Event
          </button>
          <FullCalendar plugins={[dayGridPlugin]} initialView='dayGridMonth' />
        </div>
      </div>

      {/* Add Event Modal */}
      {/* <div className={readReviewModal}> */}
      <div className='modal is-active'>
        <div className='modal-background'></div>
        <div className='modal-card'>
          <header className='modal-card-head modal-header-style'>
            <p className='modal-card-title'>Book A Tutoring Session</p>
            <button
              className='delete'
              aria-label='close'
              onClick={handleModalClose}
            ></button>
          </header>
          <section className='modal-card-body'>
            <form>
              <label className='mr-2'>
                Your Name
                <input
                  type='text'
                  placeholder='Enter Your Name'
                  name='studentName'
                  onChange={handleInputChange}
                ></input>
              </label>
              <label>
                Date
                <input type='date' onChange={handleInputChange} name='date' />
              </label>
              <label>
                Start Time
                <input
                  type='time'
                  onChange={handleInputChange}
                  name='startTime'
                />
              </label>
              <label>
                End Time
                <input
                  type='time'
                  onChange={handleInputChange}
                  name='endTime'
                />
              </label>
            </form>
          </section>
          <footer className='modal-card-foot modal-bottom-style'>
            <button className='button is-info' onClick={handleBookSession}>
              Submit
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
