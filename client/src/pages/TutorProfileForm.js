import React, { useState } from 'react';
import Address from '../components/Address';
import Subjects from '../components/Subjects';
import UserInfo from '../components/UserInfo';
import Bio from '../components/Bio';
import Delivery from '../components/Delivery';
import Button from '../components/Button';

export default function ProfileForm(props) {
  const [tutorFormInfo, setTutorFormInfo] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(value, name);
    // use brackets to signify the name in the state
    setTutorFormInfo({
      ...tutorFormInfo,
      [name]: value,
    });
  }

  return (
    <div className='container mt-5 mb-5'>
      <h1 className='title'>Tutor Form</h1>
      <UserInfo handleInputChange={handleInputChange} />

      <Bio handleInputChange={handleInputChange} />

      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>Education</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <div className='control'>
              <textarea
                className='textarea'
                id='credientials'
                placeholder='Degree(s)'
                name="degree"
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          <div className='field'>
            <div className='control'>
              <textarea
                className='textarea'
                id='experience'
                placeholder='Experience'
                name="experience"
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <Subjects />

      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>Availability</label>
        </div>
        <div className='field-body'>
          <div className='field is-narrow'>
            <div className='control'>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='sunday'
                  value='Sunday'
                  type='checkbox'
                  name='day'
                  // onChange={handleInputChange}
                />
                Sunday
              </label>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='monday'
                  value='Monday'
                  type='checkbox'
                  name='day'
                  // onChange={handleInputChange}
                />
                Monday
              </label>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='tuesday'
                  value="Tuesday"
                  type='checkbox'
                  name='day'
                  // onChange={handleInputChange}
                />
                Tuesday
              </label>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='wednesday'
                  value='Wednesday'
                  type='checkbox'
                  name='day'
                  // onChange={handleInputChange}
                />
                Wednesday
              </label>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='thursday'
                  value='Thursday'
                  type='checkbox'
                  name='day'
                  // onChange={handleInputChange}
                />
                Thursday
              </label>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='friday'
                  value='Friday'
                  type='checkbox'
                  name='day'
                  // onChange={handleInputChange}
                />
                Friday
              </label>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='saturday'
                  value="Saturday"
                  type='checkbox'
                  name='day'
                  // onChange={handleInputChange}
                />
                Saturday
              </label>
            </div>
          </div>
        </div>
      </div>

      <Delivery handleInputChange={handleInputChange} />

      <Address handleInputChange={handleInputChange} />

      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>Rate per Hour (optional)</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <div className='control'>
              <input type='number' name="rate" className='' placeholder='$' onChange={handleInputChange}></input>
            </div>
          </div>
        </div>
      </div>

      <Button />
    </div>
  );
}
