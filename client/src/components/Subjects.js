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
                      name='subject'
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
                      name='subject'
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
                      name='subject'
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
                      name='subject'
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
                      name='subject'
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
                      name='subject'
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
                      name='subject'
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
                      name='subject'
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
                      name='subject'
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
                        name='subject'
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
                        name='subject'
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
                        name='subject'
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
                        name='subject'
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
                        name='subject'
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
                        name='subject'
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
                        name='subject'
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
                        name='subject'
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
                        name='subject'
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
                        name='subject'
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
                        name='subject'
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
                        name='subject'
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
                        name='subject'
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
                        name='subject'
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
                        name='subject'
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
                        name='subject'
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
                        name='subject'
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
                        name='subject'
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
                        name='subject'
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
