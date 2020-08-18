import React from 'react';

export default function Subjects() {
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
                      id='el-lang-arts'
                      type='checkbox'
                      name='member'
                    />
                    Language Arts
                  </label>
                </td>
                <td>
                  <label className='checkbox mr-5'>
                    <input
                      className='mr-2'
                      id='md-lang-arts'
                      type='checkbox'
                      name='member'
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
                      id='el-math'
                      type='checkbox'
                      name='member'
                    />
                    Math
                  </label>
                </td>
                <td>
                  <label className='checkbox mr-5'>
                    <input
                      className='mr-2'
                      id='md-basic-math'
                      type='checkbox'
                      name='member'
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
                      id='el-science'
                      type='checkbox'
                      name='member'
                    />
                    Science
                  </label>
                </td>
                <td>
                  <label className='checkbox mr-5'>
                    <input
                      className='mr-2'
                      id='md-prealgebra'
                      type='checkbox'
                      name='member'
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
                      id='el-ss'
                      type='checkbox'
                      name='member'
                    />
                    Social Studies
                  </label>
                </td>
                <td>
                  <label className='checkbox mr-5'>
                    <input
                      className='mr-2'
                      id='md-science'
                      type='checkbox'
                      name='member'
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
                      id='md-ss'
                      type='checkbox'
                      name='member'
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
                  <th>High School Subjects</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        id='hs-english'
                        type='checkbox'
                        name='member'
                      />
                      English
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        id='hs-bio'
                        type='checkbox'
                        name='member'
                      />
                      Biology
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        id='hs-government'
                        type='checkbox'
                        name='member'
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
                        id='hs-algebra'
                        type='checkbox'
                        name='member'
                      />
                      Algebra
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        id='hs-physics'
                        type='checkbox'
                        name='member'
                      />
                      Physics
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        id='hs-precalc'
                        type='checkbox'
                        name='member'
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
                        id='hs-geometry'
                        type='checkbox'
                        name='member'
                      />
                      Geometry
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        id='hs-chem'
                        type='checkbox'
                        name='member'
                      />
                      Chemistry
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        id='hs-history'
                        type='checkbox'
                        name='member'
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
                        id='hs-trig'
                        type='checkbox'
                        name='member'
                      />
                      Trigonometry
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        id='hs-physical'
                        type='checkbox'
                        name='member'
                      />
                      Physical Science
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        id='hs-geography'
                        type='checkbox'
                        name='member'
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
                        id='hs-stats'
                        type='checkbox'
                        name='member'
                      />
                      Statistics
                    </label>
                  </td>

                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        id='hs-spanish'
                        type='checkbox'
                        name='member'
                      />
                      Spanish
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        id='hs-psych'
                        type='checkbox'
                        name='member'
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
                        id='hs-precalc'
                        type='checkbox'
                        name='member'
                      />
                      Pre-Calculus
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        id='hs-french'
                        type='checkbox'
                        name='member'
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
                        id='hs-calc'
                        type='checkbox'
                        name='member'
                      />
                      Calculus
                    </label>
                  </td>
                  <td>
                    <label className='checkbox mr-5'>
                      <input
                        className='mr-2'
                        id='hs-german'
                        type='checkbox'
                        name='member'
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
