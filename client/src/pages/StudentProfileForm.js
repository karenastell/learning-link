import React from 'react';
import UserInfo from '../components/UserInfo';
import Address from '../components/Address';
import Intro from '../components/Intro';
import Subjects from '../components/Subjects';
import Button from '../components/Button';
import Delivery from '../components/Delivery';

export default function StudentProfileForm(props) {
  return (
    <div className='container mt-5 mb-5'>
      <h1 className='title'>Student Form</h1>
      <UserInfo />
      <Intro />

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

      <Address />
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
      <Subjects />
      <Delivery />
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
