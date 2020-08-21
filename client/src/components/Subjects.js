import React from 'react';

export default function Subjects(props) {
  return (
    <>
      <div className='field is-horizontal'>
        <div className='field-label'>
          <label className='label'>Subjects</label>
        </div>
        <div className='field-body'>
          <table className='table'>
            <thead>
              <tr>
                <th>Elementary School Subjects</th>
                <th>Middle School Subjects</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <label className='checkbox mr-5'>
                    <input
                      className='mr-2'
                      value='Elementary: Language Arts'
                      type='checkbox'
                      name='subject'
                      onChange={props.handleCheckboxes}
                    />
                    Language Arts
                  </label>
                </td>
                <td>
                  <label className='checkbox mr-5'>
                    <input
                      className='mr-2'
                      value='Middle School: Language Arts'
                      type='checkbox'
                      name='subject'
                      onChange={props.handleCheckboxes}
                    />
                    Language Arts
                  </label>
                </td>
              </tr>

              <tr>
                <td>
                  <label className='checkbox mr-5'>
                    <input
                      className='mr-2'
                      value='Elementary: Math'
                      type='checkbox'
                      name='subject'
                      onChange={props.handleCheckboxes}
                    />
                    Math
                  </label>
                </td>
                <td>
                  <label className='checkbox mr-5'>
                    <input
                      className='mr-2'
                      value='Middle School: Basic Math'
                      type='checkbox'
                      name='subject'
                      onChange={props.handleCheckboxes}
                    />
                    Basic Math
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className='checkbox mr-5'>
                    <input
                      className='mr-2'
                      value='Elementary: Science'
                      type='checkbox'
                      name='subject'
                      onChange={props.handleCheckboxes}
                    />
                    Science
                  </label>
                </td>
                <td>
                  <label className='checkbox mr-5'>
                    <input
                      className='mr-2'
                      value='Middle School: Pre-Algebra'
                      type='checkbox'
                      name='subject'
                      onChange={props.handleCheckboxes}
                    />
                    Pre-Algebra
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className='checkbox mr-5'>
                    <input
                      className='mr-2'
                      value='Elementary: Social Studies'
                      type='checkbox'
                      name='subject'
                      onChange={props.handleCheckboxes}
                    />
                    Social Studies
                  </label>
                </td>
                <td>
                  <label className='checkbox mr-5'>
                    <input
                      className='mr-2'
                      value='Middle School: Science'
                      type='checkbox'
                      name='subject'
                      onChange={props.handleCheckboxes}
                    />
                    Science
                  </label>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <label className='checkbox mr-5'>
                    <input
                      className='mr-2'
                      value='Middle School: Social Studies'
                      type='checkbox'
                      name='subject'
                      onChange={props.handleCheckboxes}
                    />
                    Social Studies
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='field is-horizontal'>
        <div className='field-label'>
          <label className='label'></label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <table className='table'>
              <thead>
                <tr>
                  <th>
                    High School Subjects onChange={props.handleCheckboxes}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='High School: English'
                        type='checkbox'
                        name='subject'
                        onChange={props.handleCheckboxes}
                      />
                      English
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='High School: Biology'
                        type='checkbox'
                        name='subject'
                        onChange={props.handleCheckboxes}
                      />
                      Biology
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='High School: Government'
                        type='checkbox'
                        name='subject'
                        onChange={props.handleCheckboxes}
                      />
                      Government
                    </label>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='High School: Algebra'
                        type='checkbox'
                        name='subject'
                        onChange={props.handleCheckboxes}
                      />
                      Algebra
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='High School: Physics'
                        type='checkbox'
                        name='subject'
                        onChange={props.handleCheckboxes}
                      />
                      Physics
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='High School: Business'
                        type='checkbox'
                        name='subject'
                        onChange={props.handleCheckboxes}
                      />
                      Business
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='High School: Geometry'
                        type='checkbox'
                        name='subject'
                        onChange={props.handleCheckboxes}
                      />
                      Geometry
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='High School: Chemistry'
                        type='checkbox'
                        name='subject'
                        onChange={props.handleCheckboxes}
                      />
                      Chemistry
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='High School: US History'
                        type='checkbox'
                        name='subject'
                        onChange={props.handleCheckboxes}
                      />
                      US History
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='High School: Trigonometry'
                        type='checkbox'
                        name='subject'
                        onChange={props.handleCheckboxes}
                      />
                      Trigonometry
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='High School: Physical Science'
                        type='checkbox'
                        name='subject'
                        onChange={props.handleCheckboxes}
                      />
                      Physical Science
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='High School: Geography'
                        type='checkbox'
                        name='subject'
                        onChange={props.handleCheckboxes}
                      />
                      Geography
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='High School: Statistics'
                        type='checkbox'
                        name='subject'
                        onChange={props.handleCheckboxes}
                      />
                      Statistics
                    </label>
                  </td>

                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='High School: Spanish'
                        type='checkbox'
                        name='subject'
                        onChange={props.handleCheckboxes}
                      />
                      Spanish
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='High School: Psychology'
                        type='checkbox'
                        name='subject'
                        onChange={props.handleCheckboxes}
                      />
                      Psychology
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='High School: Pre-Calculus'
                        type='checkbox'
                        name='subject'
                        onChange={props.handleCheckboxes}
                      />
                      Pre-Calculus
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='High School: French'
                        type='checkbox'
                        name='subject'
                        onChange={props.handleCheckboxes}
                      />
                      French
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='High School: Calculus'
                        type='checkbox'
                        name='subject'
                        onChange={props.handleCheckboxes}
                      />
                      Calculus
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='High School: German'
                        type='checkbox'
                        name='subject'
                        onChange={props.handleCheckboxes}
                      />
                      German
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
