import React from 'react'

export default function Bio(props) {
    return (
        <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>Bio *</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <div className='control'>
              <textarea
                className='textarea'
                id='about'
                placeholder='A brief introduction to share with potential students.'
                name='bio'
                onChange={props.handleInputChange || props.handleProfileInfoChange}
                value={props.bio ? props.bio : undefined}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    )
}
