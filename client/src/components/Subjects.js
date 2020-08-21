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
                      value='el-lang-arts'
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
                      value='md-lang-arts'
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
                      value='el-math'
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
                      value='md-basic-math'
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
                      value='el-science'
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
                      value='md-prealgebra'
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
                      value='el-ss'
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
                      value='md-science'
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
                      value='md-ss'
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
                  <th>High School Subjects
                    onChange={props.handleCheckboxes}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        value='hs-english'
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
                        value='hs-bio'
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
                        value='hs-government'
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
                        value='hs-algebra'
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
                        value='hs-physics'
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
                        value='hs-precalc'
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
                        value='hs-geometry'
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
                        value='hs-chem'
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
                        value='hs-history'
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
                        value='hs-trig'
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
                        value='hs-physical'
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
                        value='hs-geography'
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
                        value='hs-stats'
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
                        value='hs-spanish'
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
                        value='hs-psych'
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
                        value='hs-precalc'
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
                        value='hs-french'
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
                        value='hs-calc'
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
                        value='hs-german'
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
