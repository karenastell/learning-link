import React from 'react'

export default function Delivery(props) {
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
                value='remote'
                type='radio'
                name='delivery_method'
                onChange={props.handleInputChange}
              />
              Remote
            </label>
            <label className='checkbox mr-5'>
              <input
                className='mr-2'
                id='elementary'
                type='radio'
                value='In Person'
                name='delivery_method'
                onChange={props.handleInputChange}
              />
              In Person
            </label>
            <label className='checkbox mr-5'>
              <input
                className='mr-2'
                id='elementary'
                type='radio'
                value='hybrid'
                name='delivery_method'
                onChange={props.handleInputChange}
              />
              Hybrid
            </label>
          </div>
        </div>
      </div>
    )
}
