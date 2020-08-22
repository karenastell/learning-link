import React from 'react';

export default function Availability(props) {
  return (
    <div className='field is-horizontal'>
      <div className='field-label is-normal'>
        <label className='label'>Availability</label>
      </div>
      <div className='field-body'>
        <div className='field is-narrow'>
          <div className='control'>
            <label className='checkbox mr-5'>
              <input
                className='mr-2'
                id='sunday'
                value='Sunday'
                type='checkbox'
                name='day'
                check={props.check}
                onClick={props.checkChecked}
              />
              Sunday
            </label>
            <label className='checkbox mr-5'>
              <input
                className='mr-2'
                id='monday'
                value='Monday'
                type='checkbox'
                name='day'
                onClick={props.checkChecked}
              />
              Monday
            </label>
            <label className='checkbox mr-5'>
              <input
                className='mr-2'
                id='tuesday'
                value='Tuesday'
                type='checkbox'
                name='day'
                onClick={props.checkChecked}
              />
              Tuesday
            </label>
            <label className='checkbox mr-5'>
              <input
                className='mr-2'
                id='wednesday'
                value='Wednesday'
                type='checkbox'
                name='day'
                onClick={props.checkChecked}
              />
              Wednesday
            </label>
            <label className='checkbox mr-5'>
              <input
                className='mr-2'
                id='thursday'
                value='Thursday'
                type='checkbox'
                name='day'
                onClick={props.checkChecked}
              />
              Thursday
            </label>
            <label className='checkbox mr-5'>
              <input
                className='mr-2'
                id='friday'
                value='Friday'
                type='checkbox'
                name='day'
                onClick={props.checkChecked}
              />
              Friday
            </label>
            <label className='checkbox mr-5'>
              <input
                className='mr-2'
                id='saturday'
                value='Saturday'
                type='checkbox'
                name='day'
                onClick={props.checkChecked}
              />
              Saturday
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
