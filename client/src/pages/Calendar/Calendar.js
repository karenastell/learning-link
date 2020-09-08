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
  const [tutorNames, setTutorNames] = useState([]);
  const [errorAlert, setErrorAlert] = useState('off');

  const { forUser, myCalendar } = queryString.parse(location.search);

  useEffect(() => {
    const startFunction = async () => {
      getAllEvents();
      // await getAllTutorNames();
    };
    startFunction();
  }, []);

  // const getAllTutorNames = () => {
  //   Axios.get('api/tutorNames').then((response) => {
  //     console.log(response);
  //     const allTutors = response.data;
  //     console.log(allTutors);
  //     setTutorNames(allTutors);
  //   });
  // };

  const getAllEvents = () => {
    Axios.get('api/tutorNames').then((response) => {
      console.log(response);
      const allTutors = response.data;
      console.log(allTutors);
      setTutorNames(allTutors);
      console.log(tutorNames);
    });
    let eventArray = [];
    Axios.get(`api/calendar/id/${forUser}`).then((response) => {
      console.log(response);
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
          let tutorId = response.data[i].TutorId;
          console.log(tutorId);
          // let tutorName;

          // Axios.get(`api/calendar/tutorName/${tutorId}`).then((response) => {
          //   console.log(response);
          //   tutorName = response.data.firstName;
          //   console.log(tutorName);
          // });
          console.log(tutorNames);
          const name = tutorNames.filter((tutor) => tutor.id === tutorId);
          console.log(name);

          eventArray.push({
            id: response.data[i].id,
            title: `You have Tutoring with`,
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

      console.log(eventArray);
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
    if (
      !session.studentName ||
      !session.startTime ||
      !session.endTime ||
      !session.date
    ) {
      setErrorAlert('on');
    } else {
      const eventObject = {
        event: `Tutoring with ${session.studentName}`,
        start: new Date(`${session.date} ${session.startTime}`).toISOString(),
        end: new Date(`${session.date} ${session.endTime}`).toISOString(),
      };
      Axios.post(
        `api/calendar/tutor/${forUser}/student/${userId}`,
        eventObject
      ).then((response) => {
        console.log('session has been booked', response);
        handleModalClose();
        getAllEvents();
      });
      let roomNumber;
      await Axios.get(
        `api/calendar/messageinfo/tutorId/${forUser}/studentId/${userId}`
      ).then((response) => {
        console.log(response);
        roomNumber = response.data.room;
        console.log(roomNumber);
      });

      let date = new Date(`${session.date} ${session.startTime}`);

    Axios.post(
      `api/message/tutor${forUser}/student${userId}/sender${userId}/room${roomNumber}`,
      {
        message: `I booked a session for ${date.toLocaleTimeString()} on ${date.toLocaleDateString()}`,
      }
    ).then(() => {
      console.log('session info messaged to tutor');
      history.push('/event-booked')
    });
  };

  // When you click an event a modal pops up with the event details.  If it is the user's own calendar, they have the option to cancel the event
  const handleEventClick = (clickInfo) => {
    console.log(clickInfo.event.title);
    console.log(clickInfo.event.id, 'clicked id');
    // console.log(clickInfo.event.start)
    // console.log(clickInfo.event.end)
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
      console.log(response);
      studentId = response.data.StudentId;
      tutorId = response.data.TutorId;
      date = new Date(response.data.start);
      console.log(new Date(date).toLocaleString('en-US'));
    });

    console.log(id, 'This is the event id');

    Axios.delete(`api/calendar/eventId/${id}`).then((response) => {
      console.log(response.data, 'deleted');
      // close the modal
      setViewEventModal('modal');
      // Then get all the events so the calendar will update
      getAllEvents();
    });

    let roomNumber;
    await Axios.get(
      `api/calendar/messageinfo/tutorId/${tutorId}/studentId/${studentId}`
    ).then((response) => {
      console.log(response);
      roomNumber = response.data.room;
      console.log(roomNumber);
    });
    console.log(studentId, tutorId, roomNumber);
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

          <div className='calendar-style'>
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
        <div className="modal-background"></div>
        <div className="modal-card calendar-style">
          <header className="modal-card-head modal-header-style">
            <p className="modal-card-title">Tutor Session:</p>
            <button
              className='delete'
              aria-label='close'
              onClick={handleModalClose}
            ></button>
          </header>
          <section className="modal-card-body px-6">
            <p className="title is-5">{clickedEvent.title}</p>
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
