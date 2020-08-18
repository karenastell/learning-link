import React from 'react'

export default function Intro() {
    return (
        <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>Introduction</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <div className='control'>
              <textarea
                className='textarea'
                id='about'
                placeholder='A breif introduction to share with potential students.'
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    )
}
