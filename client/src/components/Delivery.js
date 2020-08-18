import React from 'react'

export default function Delivery() {
    return (
        <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>Delivery</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <label className='checkbox mr-5'>
              <input
                className='mr-2'
                id='elementary'
                type='checkbox'
                name='member'
              />
              Remote
            </label>
            <label className='checkbox mr-5'>
              <input
                className='mr-2'
                id='elementary'
                type='checkbox'
                name='member'
              />
              In Person
            </label>
          </div>
        </div>
      </div>
    )
}
