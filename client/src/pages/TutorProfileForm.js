import React from 'react';
import Address from '../components/Address';
import Subjects from '../components/Subjects';
import UserInfo from '../components/UserInfo';
import Bio from '../components/Bio';
import Delivery from '../components/Delivery';
import Button from '../components/Button';

export default function ProfileForm(props) {
  return (
    <div className='container mt-5 mb-5'>
      <h1 className='title'>Tutor Form</h1>
      <UserInfo />

      <Bio />

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
