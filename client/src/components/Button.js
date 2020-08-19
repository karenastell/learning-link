import React from 'react'

export default function Button(props) {
    return (
        <div className='field is-horizontal'>
        <div className='field-label'></div>
        <div className='field-body'>
          <div className='field'>
            <div className='control'>
              <button className='button is-primary'>Submit</button>
            </div>
          </div>
        </div>
      </div>
    )
}
