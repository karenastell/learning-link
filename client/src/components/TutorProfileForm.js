import React from 'react';
import Address from './Address';
import Subjects from './Subjects';
import Grades from './Grades';
import UserInfo from './UserInfo';
import Intro from './Intro';
import Delivery from './Delivery';
import Button from './Button';

export default function ProfileForm() {
  return (
    <div className='container mt-5 mb-5'>
      <UserInfo />

      <Intro />

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
                placeholder='Credientials'
              ></textarea>
            </div>
          </div>

          <div className='field'>
            <div className='control'>
              <textarea
                className='textarea'
                id='experience'
                placeholder='Experience'
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <Grades />

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
                  type='checkbox'
                  name='member'
                />
                Sunday
              </label>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='monday'
                  type='checkbox'
                  name='member'
                />
                Monday
              </label>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='tuesday'
                  type='checkbox'
                  name='member'
                />
                Tuesday
              </label>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='wednesday'
                  type='checkbox'
                  name='member'
                />
                Wednesday
              </label>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='thursday'
                  type='checkbox'
                  name='member'
                />
                Thursday
              </label>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='friday'
                  type='checkbox'
                  name='member'
                />
                Friday
              </label>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='saturday'
                  type='checkbox'
                  name='member'
                />
                Saturday
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'></label>
        </div>
        <div className='field-body'>
          <div className='field is-narrow'>
            <div className='control'>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='morning'
                  type='checkbox'
                  name='member'
                />
                Morning (7:00am - 12:00pm)
              </label>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='afternoon'
                  type='checkbox'
                  name='member'
                />
                Afternoon (12:00pm - 5:00pm)
              </label>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='evening'
                  type='checkbox'
                  name='member'
                />
                Evening (5:00pm - 10:00pm)
              </label>
            </div>
          </div>
        </div>
      </div>

      <Delivery />

      <Address />

      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>Rate per Hour (optional)</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <div className='control'>
              <input type='number' className='' placeholder='$'></input>
            </div>
          </div>
        </div>
      </div>

      <Button />
    </div>
  );
}
