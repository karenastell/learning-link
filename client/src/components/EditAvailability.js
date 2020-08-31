import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import Axios from 'axios';

export default function EditAvailability({
  setEditAvailabilityMode,
  isTeacher,
  getUserInfo,
}) {
  const { userId } = useContext(AuthContext);

  const [days, setDays] = useState([]);
// alert displays if they try to save without checking off a day
  const [alert, setAlert] = useState('off');

  const handleDaysCheckBoxes = (event) => {
    setDays([...days, event.target.value]);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);


  const handleSaveChanges = () => {
    // First make sure they checked at least one day...
    if (days[0]) {
      Axios.put(`/api/edit-profile/availability/${userId}`, days).then(() => {
        console.log('Edit was successful!');
        // get the updated userinfo from the database
        getUserInfo();
        setEditAvailabilityMode('off');
      });
    } else {
      setAlert('on');
    }
  };

  return (
    <>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Availability</label>
        </div>
        <div className="field-body">
          <div className="field is-narrow">
            <div className="control">
              <label className="checkbox mr-5">
                <input
                  className="mr-2"
                  id="sunday"
                  value="Sunday"
                  type="checkbox"
                  name="day"
                  onClick={handleDaysCheckBoxes}
                />
                Sunday
              </label>
              <label className="checkbox mr-5">
                <input
                  className="mr-2"
                  id="monday"
                  value="Monday"
                  type="checkbox"
                  name="day"
                  onClick={handleDaysCheckBoxes}
                />
                Monday
              </label>
              <label className="checkbox mr-5">
                <input
                  className="mr-2"
                  id="tuesday"
                  value="Tuesday"
                  type="checkbox"
                  name="day"
                  onClick={handleDaysCheckBoxes}
                />
                Tuesday
              </label>
              <label className="checkbox mr-5">
                <input
                  className="mr-2"
                  id="wednesday"
                  value="Wednesday"
                  type="checkbox"
                  name="day"
                  onClick={handleDaysCheckBoxes}
                />
                Wednesday
              </label>
              <label className="checkbox mr-5">
                <input
                  className="mr-2"
                  id="thursday"
                  value="Thursday"
                  type="checkbox"
                  name="day"
                  onClick={handleDaysCheckBoxes}
                />
                Thursday
              </label>
              <label className="checkbox mr-5">
                <input
                  className="mr-2"
                  id="friday"
                  value="Friday"
                  type="checkbox"
                  name="day"
                  onClick={handleDaysCheckBoxes}
                />
                Friday
              </label>
              <label className="checkbox mr-5">
                <input
                  className="mr-2"
                  id="saturday"
                  value="Saturday"
                  type="checkbox"
                  name="day"
                  onClick={handleDaysCheckBoxes}
                />
                Saturday
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label"></div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              {alert === 'on' ? (
                <article className="message is-danger">
                  <div className="message-body">
                    You must select at least one day!
                  </div>
                </article>
              ) : null}
              <button className="button is-primary" onClick={handleSaveChanges}>
                Save Changes
              </button>
              <button
                className="button is-light mx-4"
                onClick={() => setEditAvailabilityMode('off')}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
