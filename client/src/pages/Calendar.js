import React, { useState, useEffect, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import Axios from 'axios';
import SideBarMenu from '../components/SideBarMenu/SideBarMenu';
import Nav from '../components/Nav/Nav';
import { AuthContext } from '../AuthContext';
import queryString from 'query-string';
import '../App.css';

// import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

export default function Calendar({ location }) {
  const [bookSessionModal, setBookSessionModal] = useState('modal');
  const { userId, isTeacher } = useContext(AuthContext);
  const [session, setSession] = useState([]);
  const [userEvents, setUserEvents] = useState([]);

  const { forUser, myCalendar } = queryString.parse(location.search);

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = () => {
    let eventArray = [];
    Axios.get(`api/calendar/id/${forUser}`).then((response) => {
      console.log(response);
      if(isTeacher){
           for (let i = 0; i < response.data.length; i++) {
        eventArray.push({
          id: response.data[i].id,
          title: response.data[i].event,
          start: response.data[i].start,
          end: response.data[i].end,
        });
      }
      } else {
        for (let i = 0; i < response.data.length; i++) {
          eventArray.push({
            title: 'You have Tutoring',
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
  };

  const handleReadReview = () => {
    setBookSessionModal('modal is-active');
  };

  const handleBookSession = () => {

    const eventObject = {
      event: `Tutoring Session with ${session.studentName}`,
      start: new Date(`${session.date} ${session.startTime}`).toISOString(),
      end: new Date(`${session.date} ${session.endTime}`).toISOString(),
    };
    Axios.post(
      `api/calendar/tutor/${forUser}/student/${userId}`,
      eventObject
    ).then((response) => {
      console.log('session has been booked', response);
      handleModalClose();
    });
  };

  const handleEventClick = (clickInfo) => {
    console.log(clickInfo.event.title)
    console.log(clickInfo.event.id)
    console.log(clickInfo.event.start)
    console.log(clickInfo.event.end)
    // clickInfo.event.remove()
  }

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
            Book a Tutoring Session
          </button>
          <FullCalendar
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
          }}
          initialView='dayGridMonth'
            header={{
              left: 'prev, next',
              center: 'title',
              right: "dayGridMonth, timeGridWeek, timeGridDay"
            }}
            plugins={[timeGridPlugin, dayGridPlugin]}
            eventClick={handleEventClick}
            events={userEvents}
          />
        
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
