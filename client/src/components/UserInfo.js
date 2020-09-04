import React from 'react';

export default function UserInfo(props) {
  return (
    <>
      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>Your Information</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <p className='control is-expanded'>
              <input
                className='input'
                id='first-name'
                type='text'
                placeholder='First Name'
                name='firstName'
                onChange={props.handleInputChange}
              />
            </p>
          </div>
          <div className='field'>
            <p className='control is-expanded'>
              <input
                className='input'
                id='last-name'
                type='text'
                placeholder='Last Name'
                name='lastName'
                onChange={props.handleInputChange}
              />
            </p>
          </div>

          <div className='field'>
            <p className='control is-expanded'>
              <input
                className='input'
                type='email'
                placeholder='Email'
                name='email'
                onChange={props.handleInputChange}
              />
            </p>
          </div>
        </div>
      </div>
      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>Password</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <p className='control is-expanded'>
              <input
                className='input'
                type='password'
                placeholder='Password'
                name='password'
                onChange={props.handleInputChange}
              />
            </p>
          </div>
        </div>
      </div>
      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>Password</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <p className='control is-expanded'>
              <input
                className='input'
                id='confirm-password'
                name="confirmPassword"
                type='password'
                placeholder='Confirm Password'
                onChange={props.handleInputChange}
              />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
