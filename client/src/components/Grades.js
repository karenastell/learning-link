import React from 'react'

export default function Grades() {
    return (
        <div className='field is-horizontal'>
        <div className='field-label'>
          <label className='label'>Grade Levels</label>
        </div>
        <div className='field-body'>
          <div className='field is-narrow'>
            <div className='control'>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='elementary'
                  type='checkbox'
                  name='member'
                />
                Elementary School (K-4)
              </label>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='middle'
                  type='checkbox'
                  name='member'
                />
                Middle School (5-8)
              </label>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='high'
                  type='checkbox'
                  name='member'
                />
                High School (9-12)
              </label>
            </div>
          </div>
        </div>
      </div>
    )
}
