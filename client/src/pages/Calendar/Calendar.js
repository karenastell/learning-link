import React, { useState, useEffect, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import Axios from 'axios';
import SideBarMenu from '../../components/SideBarMenu/SideBarMenu';
import Nav from '../../components/Nav/Nav';
import { AuthContext } from '../../AuthContext';
import queryString from 'query-string';
import './Calendar.css';

// import "@fullcalendar/core/main.css";
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import { useHistory } from 'react-router';

export default function Calendar({ location }) {
  const [bookSessionModal, setBookSessionModal] = useState('modal');
  const { userId, isTeacher } = useContext(AuthContext);
  const [session, setSession] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  // controls displaying of the viewEventModal
  const [viewEventModal, setViewEventModal] = useState('modal');
  const [clickedEvent, setClickedEvent] = useState({});
  const [errorAlert, setErrorAlert] = useState('off');

  const { forUser, myCalendar } = queryString.parse(location.search);

  useEffect(() => {
    const startFunction = async () => {
      getAllEvents();
    };
    startFunction();
  }, []);


  const getAllEvents = () => {
    let eventArray = [];
    // gets all the events for the user's calendar 
    // dependent on if they are a tutor or student
    // the calendar will display different event names
    Axios.get(`api/calendar/id/${forUser}`).then((response) => {

      if (isTeacher) {
        for (let i = 0; i < response.data.length; i++) {
          eventArray.push({
            id: response.data[i].id,
            title: response.data[i].event,
            start: response.data[i].start,
            end: response.data[i].end,
          });
        }
      } else if (!isTeacher && myCalendar === 'true') {
        for (let i = 0; i < response.data.length; i++) {

          eventArray.push({
            id: response.data[i].id,
            title: `You have Tutoring`,
            start: response.data[i].start,
            end: response.data[i].end,
          });
        }
      } else if (!isTeacher && myCalendar === 'false') {
        for (let i = 0; i < response.data.length; i++) {
          eventArray.push({
            id: response.data[i].id,
            title: 'Tutor Is Unavailable',
            start: response.data[i].start,
            end: response.data[i].end,
          });
        }
      }

      setUserEvents(eventArray);
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSession({
      ...session,
      [name]: value,
    });
  };

  const handleModalClose = () => {
    setBookSessionModal('modal');
    setViewEventModal('modal');
  };

  const handleBookSessionModal = () => {
    setBookSessionModal('modal is-active');
  };
  const history = useHistory();

  const handleBookSession = async () => {
    // all fields in the booking a session modal need to be filled out
    if (
      !session.studentName ||
      !session.startTime ||
      !session.endTime ||
      !session.date
    ) {
      setErrorAlert('on');
    } else {
      // create an object to be used as the events prop in the calendar to set the event
      const eventObject = {
        event: `Tutoring with ${session.studentName}`,
        start: new Date(`${session.date} ${session.startTime}`).toISOString(),
        end: new Date(`${session.date} ${session.endTime}`).toISOString(),
      };
      // post that event to the database
      Axios.post(
        `api/calendar/tutor/${forUser}/student/${userId}`,
        eventObject
      ).then((response) => {
        console.log('session has been booked');
        handleModalClose();
        getAllEvents();
      });
      let roomNumber;
      // get the ids for the tutor and student that the event is being made for
      await Axios.get(
        `api/calendar/messageinfo/tutorId/${forUser}/studentId/${userId}`
      ).then((response) => {
        roomNumber = response.data.room;
      });

      let date = new Date(`${session.date} ${session.startTime}`);

      // post a message when the event is made 
      Axios.post(
        `api/message/tutor${forUser}/student${userId}/sender${userId}/room${roomNumber}`,
        {
          message: `I booked a session for ${date.toLocaleTimeString()} on ${date.toLocaleDateString()}`,
        }
      ).then(() => {
        console.log('session info messaged to tutor');
        history.push('/event-booked');
      });
    }
  };

  // When you click an event a modal pops up with the event details.  If it is the user's own calendar, they have the option to cancel the event
  const handleEventClick = (clickInfo) => {
    setClickedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start.toISOString(),
      end: clickInfo.event.end.toISOString(),
    });
    setViewEventModal('modal is-active');
  };

  const deleteEvent = async (id) => {
    let studentId;
    let tutorId;
    let date;
    await Axios.get(`api/calendar/eventinfo/${id}`).then((response) => {
      studentId = response.data.StudentId;
      tutorId = response.data.TutorId;
      date = new Date(response.data.start);
    });

    Axios.delete(`api/calendar/eventId/${id}`).then((response) => {
      // close the modal
      setViewEventModal('modal');
      // Then get all the events so the calendar will update
      getAllEvents();
    });

    let roomNumber;
    // get the ids of the tutor and student the event is being deleted from and the message room they share
    await Axios.get(
      `api/calendar/messageinfo/tutorId/${tutorId}/studentId/${studentId}`
    ).then((response) => {
      roomNumber = response.data.room;
    });
    // send a message to the tutor and student when event has been deleted
    Axios.post(
      `api/message/tutor${tutorId}/student${studentId}/sender${userId}/room${roomNumber}`,
      {
        message: `I have deleted our tutoring session for ${date.toLocaleTimeString()} on ${date.toLocaleDateString()}.`,
      }
    ).then(() => {
      console.log('session deletion message sent');
    });
  };

  return (
    <>
      <Nav />
      <div className='columns'>
        <div className='column is-narrow side-bar'>
          <SideBarMenu doNotShow={'true'} />
        </div>
        <div className='container column mt-3'>
          {myCalendar === 'false' ? (
            <button
              className='button is-light is-info is-fullwidth'
              onClick={handleBookSessionModal}
            >
              Book a Tutoring Session
            </button>
          ) : null}

          <div className='calendar-style px-3'>
            <FullCalendar
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek',
              }}
              initialView='dayGridMonth'
              header={{
                left: 'prev, next',
                center: 'title',
                right: 'dayGridMonth, timeGridWeek, timeGridDay',
              }}
              plugins={[timeGridPlugin, dayGridPlugin]}
              eventClick={handleEventClick}
              events={userEvents}
            />
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      <div className={bookSessionModal}>
        {/* <div className='modal is-active'> */}
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
                  className='input'
                  type='text'
                  placeholder='Enter Your Name'
                  name='studentName'
                  onChange={handleInputChange}
                ></input>
              </label>
              <label>
                Date
                <input
                  type='date'
                  onChange={handleInputChange}
                  name='date'
                  className='input'
                />
              </label>
              <label className='mr-2'>
                Start Time
                <input
                  className='input'
                  type='time'
                  onChange={handleInputChange}
                  name='startTime'
                />
              </label>
              <label>
                End Time
                <input
                  className='input'
                  type='time'
                  onChange={handleInputChange}
                  name='endTime'
                />
              </label>
            </form>
            {errorAlert === 'off' ? null : (
              <article className='message is-danger'>
                <div className='message-body'>All fields are required!</div>
              </article>
            )}
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

      {/* View/Delete event modal */}
      <div className={viewEventModal}>
        <div className='modal-background'></div>
        <div className='modal-card calendar-modal'>
          <header className='modal-card-head modal-header-style'>
            <p className='modal-card-title'>Tutor Session:</p>
            <button
              className='delete'
              aria-label='close'
              onClick={handleModalClose}
            ></button>
          </header>
          <section className='modal-card-body px-6'>
            <p className='title is-5'>{clickedEvent.title}</p>
            <p>Start: {new Date(clickedEvent.start).toLocaleString('en-US')}</p>
            <p>End: {new Date(clickedEvent.end).toLocaleString('en-US')}</p>
            <br />
            <br />
            {myCalendar === 'true' ? (
              <p>Would you like to cancel this session?</p>
            ) : null}
          </section>
          <footer className='modal-card-foot modal-bottom-style'>
            {myCalendar === 'true' ? (
              <button
                className='button is-info'
                onClick={() => deleteEvent(clickedEvent.id)}
              >
                Yes, Cancel this session
              </button>
            ) : null}
            <button className='button' onClick={handleModalClose}>
              Close
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}
