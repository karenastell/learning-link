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
                onClick={props.handleDaysCheckBoxes}
                onChange={()=>props.handleRemove('Sunday')}
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
                onClick={props.handleDaysCheckBoxes}
                 onChange={()=>props.handleRemove('Monday')}
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
                onClick={props.handleDaysCheckBoxes}
                 onChange={()=>props.handleRemove('Tuesday')}
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
                onClick={props.handleDaysCheckBoxes}
                 onChange={()=>props.handleRemove('Wednesday')}
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
                onClick={props.handleDaysCheckBoxes}
                 onChange={()=>props.handleRemove('Thursday')}
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
                onClick={props.handleDaysCheckBoxes}
                 onChange={()=>props.handleRemove('Friday')}
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
                onClick={props.handleDaysCheckBoxes}
                 onChange={()=>props.handleRemove('Saturday')}
              />
              Saturday
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
