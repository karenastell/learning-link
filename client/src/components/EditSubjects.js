import React, { useState, useEffect, useContext } from 'react';
import Subjects from '../components/Subjects';
import { AuthContext } from '../AuthContext';
import Axios from 'axios';

export default function EditSubjects({
  setEditSubjectsMode,
  getUserInfo,
  isTeacher,
}) {
  const { userId } = useContext(AuthContext);

  const [subjects, setSubjects] = useState([]);

  const [alert, setAlert] = useState('off');

  const handleCheckboxes = (event) => {
    setSubjects([...subjects, event.target.value]);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handleSaveChanges = () => {
    // Make sure they have at least one subject checked...
    if (subjects[0]) {
      Axios.put(`/api/edit-profile/subjects/${userId}`, subjects).then(() => {
        console.log('Edit was successful!');
        getUserInfo();
        setEditSubjectsMode('off');
      });
    } else {
      setAlert('on');
    }
  };

  return (
    <>
      <Subjects handleCheckboxes={handleCheckboxes} />
      <div className="field is-horizontal">
        <div className="field-label"></div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              {alert === 'on' ? (
                <article className="message is-danger">
                  <div className="message-body">
                    You must select at least one subject!
                  </div>
                </article>
              ) : null}
              <button className="button is-primary" onClick={handleSaveChanges}>
                Save Changes
              </button>
              <button
                className="button is-light mx-4"
                onClick={() => setEditSubjectsMode('off')}
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
