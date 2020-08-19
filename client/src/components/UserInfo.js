import React from 'react';

export default function UserInfo() {
  return (
    <>
      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>Your Information</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <p className='control is-expanded has-icons-left'>
              <input
                className='input'
                id='first-name'
                type='text'
                placeholder='First Name'
              />
              <span className='icon is-small is-left'>
                <i className='fas fa-user'></i>
              </span>
            </p>
          </div>
          <div className='field'>
            <p className='control is-expanded has-icons-left'>
              <input
                className='input'
                id='last-name'
                type='text'
                placeholder='Last Name'
              />
              <span className='icon is-small is-left'>
                <i className='fas fa-user'></i>
              </span>
            </p>
          </div>

          <div className='field'>
            <p className='control is-expanded has-icons-left has-icons-right'>
              <input
                className='input'
                id='email'
                type='email'
                placeholder='Email'
              />
              <span className='icon is-small is-left'>
                <i className='fas fa-envelope'></i>
              </span>
              <span className='icon is-small is-right'></span>
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
            <p className='control is-expanded has-icons-left has-icons-right'>
              <input
                className='input'
                id='password'
                type='password'
                placeholder='Password'
              />
               <span className='icon is-small is-left'>
                <i className='fas fa-lock'></i>
              </span>
              <span className='icon is-small is-right'></span>
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
            <p className='control is-expanded has-icons-left has-icons-right'>
              <input
                className='input'
                id='confirm-password'
                type='password'
                placeholder='Confirm Password'
              />
               <span className='icon is-small is-left'>
                <i className='fas fa-lock'></i>
              </span>
              <span className='icon is-small is-right'></span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
