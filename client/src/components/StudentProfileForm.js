import React from 'react';
import UserInfo from './UserInfo';
import Address from './Address';
import Intro from './Intro';
import Subjects from './Subjects';
import Button from './Button';

export default function StudentProfileForm() {
  return (
    <div className='container'>
      <h1>Student Form</h1>
      <UserInfo />
      <Intro />

      <Subjects />

      <Address />

      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>School Information</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <p className='control is-expanded'>
              <input
                className='input'
                id='grade'
                type='text'
                placeholder='Grade'
              />
            </p>
          </div>
          <div className='field'>
            <p className='control is-expanded'>
              <input
                className='input'
                id='school'
                type='text'
                placeholder='School'
              />
            </p>
          </div>
        </div>
      </div>
      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>Special Education Services</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <label className='checkbox mr-5'>
              <input
                className='mr-2'
                id='sped-yes'
                type='checkbox'
                name='member'
              />
              Yes
            </label>
            <label className='checkbox mr-5'>
              <input
                className='mr-2'
                id='sped-no'
                type='checkbox'
                name='member'
              />
              No
            </label>
          </div>
        </div>
      </div>
      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>School Information</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <p className='control is-expanded'>
              <input
                className='input'
                id='grade'
                type='text'
                placeholder='Grade'
              />
            </p>
          </div>
          <div className='field'>
            <p className='control is-expanded'>
              <input
                className='input'
                id='school'
                type='text'
                placeholder='School'
              />
            </p>
          </div>
        </div>
      </div>
      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>
            Length of Time Tutoring is Needed (Optional)
          </label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <p className='control is-expanded '>
              <input
                className='input'
                id='first-name'
                type='text'
                placeholder=''
              />
            </p>
          </div>
        </div>
      </div>
      <Button />
    </div>
  );
}
