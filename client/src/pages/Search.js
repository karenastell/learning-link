import React, { useState, useContext } from 'react';
import Axios from 'axios';
import SideBarMenu from '../components/SideBarMenu/SideBarMenu';
import Delivery from '../components/Delivery';
import Address from '../components/Address';
import Availability from '../components/Availability';
import Subjects from '../components/Subjects';
import Nav from '../components/Nav/Nav';
import { AuthContext } from '../AuthContext';
import { useHistory } from 'react-router-dom';

export default function Search() {
  const [search, setSearch] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [days, setDays] = useState([]);
  const [check, setCheck] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });
  const { setResults } = useContext(AuthContext);

  let responseArray = [];
  let responseData;

  const handleInputChange = (event) => {
    // some more info go here: https://reactjs.org/docs/forms.html#controlled-components
    const { name, value } = event.target;
    // use brackets to signify the name in the state
    setSearch({ ...search, [name]: value });
  };

  const handleCheckboxes = (event) => {
    const { value } = event.target;
    if (subjects.includes(value)) {
      const newArray = subjects.filter((subject) => subject !== value);
      setSubjects(newArray);
    } else {
      setSubjects([...subjects, value]);
    }
  };

  const handleDaysCheckBoxes = (event) => {
    const { value } = event.target;
    if (check[value] === false) {
      // set the state to true
      // student is seeking tutoring on that day
      setCheck({ ...check, [value]: true });
      if (days.includes(value)) {
        setDays([...days]);
      } else {
        setDays([...days, value]);
      }
    } else {
      // set state to false
      // student is not seeking tutoring on that day
      setCheck({ ...check, [value]: false });
    }
  };

  const handleRemove = (value) => {
    // if the day is already in the days state array and it is unchecked, take it out of the state
    if (days.includes(value)) {
      const newArray = days.filter((day) => day !== value);
      setDays(newArray);
    }
  };

  const history = useHistory();

  const findATutor = async () => {
    // searches by different parameters
    if (days.length >= 1) {
      for (let x = 0; x < days.length; x++) {
        const response = await Axios.get(`api/search/day/${days[x]}`);
        if (response.data.length >= 1) {
          for (let y = 0; y < response.data.length; y++) {
            let dayArray = [];
            let subArray = [];

            for (let z = 0; z < response.data[y].Availabilities.length; z++) {
              await dayArray.push(response.data[y].Availabilities[z].day);
            }

            for (let i = 0; i < response.data[y].Subjects.length; i++) {
              await subArray.push(response.data[y].Subjects[i].subject);
            }
            responseData = {
              UserId: response.data[y].UserProfile.UserId,
              firstName: response.data[y].firstName,
              lastName: response.data[y].lastName,
              email: response.data[y].email,
              city: response.data[y].UserProfile.city,
              state: response.data[y].UserProfile.state,
              bio: response.data[y].UserProfile.bio,
              degree: response.data[y].UserProfile.degree,
              experience: response.data[y].UserProfile.experience,
              subject: subArray,
              day: dayArray,
              delivery_method: response.data[y].UserProfile.delivery_method,
              rate: response.data[y].UserProfile.rate,
              isTeacher: response.data[y].isTeacher,
            };
            responseArray.push(responseData);
          }
        } else {
          console.log('no responses for your day search');
        }
      }
    }

    if (subjects.length >= 1) {
      for (let x = 0; x < subjects.length; x++) {
        const response2 = await Axios.get(`api/search/subject/${subjects[x]}`);
        if (response2.data.length >= 1) {
          for (let y = 0; y < response2.data.length; y++) {
            let dayArray = [];
            let subArray = [];

            for (let z = 0; z < response2.data[y].Availabilities.length; z++) {
              await dayArray.push(response2.data[y].Availabilities[z].day);
            }

            for (let i = 0; i < response2.data[y].Subjects.length; i++) {
              await subArray.push(response2.data[y].Subjects[i].subject);
            }
            responseData = {
              UserId: response2.data[y].UserProfile.UserId,
              firstName: response2.data[y].firstName,
              lastName: response2.data[y].lastName,
              email: response2.data[y].email,
              city: response2.data[y].UserProfile.city,
              state: response2.data[y].UserProfile.state,
              bio: response2.data[y].UserProfile.bio,
              degree: response2.data[y].UserProfile.degree,
              experience: response2.data[y].UserProfile.experience,
              subject: subArray,
              day: dayArray,
              delivery_method: response2.data[y].UserProfile.delivery_method,
              rate: response2.data[y].UserProfile.rate,
              isTeacher: response2.data[y].isTeacher,
            };
            responseArray.push(responseData);
          }
        } else {
          console.log('no responses for your day search');
        }
      }
    }

    if (search.delivery_method) {
      const response3 = await Axios.get(
        `api/search/delivery_method/${search.delivery_method}`
      );
      if (response3.data.length >= 1) {
        for (let y = 0; y < response3.data.length; y++) {
          let dayArray = [];
          let subArray = [];

          for (let z = 0; z < response3.data[y].Availabilities.length; z++) {
            await dayArray.push(response3.data[y].Availabilities[z].day);
          }

          for (let i = 0; i < response3.data[y].Subjects.length; i++) {
            await subArray.push(response3.data[y].Subjects[i].subject);
          }
          responseData = {
            UserId: response3.data[y].UserProfile.UserId,
            firstName: response3.data[y].firstName,
            lastName: response3.data[y].lastName,
            email: response3.data[y].email,
            city: response3.data[y].UserProfile.city,
            state: response3.data[y].UserProfile.state,
            bio: response3.data[y].UserProfile.bio,
            degree: response3.data[y].UserProfile.degree,
            experience: response3.data[y].UserProfile.experience,
            subject: subArray,
            day: dayArray,
            delivery_method: response3.data[y].UserProfile.delivery_method,
            rate: response3.data[y].UserProfile.rate,
            isTeacher: response3.data[y].isTeacher,
          };
          responseArray.push(responseData);
        }
      } else {
        console.log('no responses for your day search');
      }
    }

    if (search.city && search.state) {
      const response4 = await Axios.get(
        `api/search/city/${search.city}/state/${search.state}`
      );
      if (response4.data.length >= 1) {
        for (let y = 0; y < response4.data.length; y++) {
          let dayArray = [];
          let subArray = [];

          for (let z = 0; z < response4.data[y].Availabilities.length; z++) {
            await dayArray.push(response4.data[y].Availabilities[z].day);
          }

          for (let i = 0; i < response4.data[y].Subjects.length; i++) {
            await subArray.push(response4.data[y].Subjects[i].subject);
          }
          responseData = {
            UserId: response4.data[y].UserProfile.UserId,
            firstName: response4.data[y].firstName,
            lastName: response4.data[y].lastName,
            email: response4.data[y].email,
            city: response4.data[y].UserProfile.city,
            state: response4.data[y].UserProfile.state,
            bio: response4.data[y].UserProfile.bio,
            degree: response4.data[y].UserProfile.degree,
            experience: response4.data[y].UserProfile.experience,
            subject: subArray,
            day: dayArray,
            delivery_method: response4.data[y].UserProfile.delivery_method,
            rate: response4.data[y].UserProfile.rate,
            isTeacher: response4.data[y].isTeacher,
          };
          responseArray.push(responseData);
        }
      } else {
        console.log('no responses for your location search');
      }
    }
// set the results into state to be used to display on search-results page
    setResults(responseArray);
    history.push('/search-results');
  };



  return (
    <>
      <Nav />
      <div className='columns'>
        <div className='column is-narrow side-bar'>
          <SideBarMenu />
        </div>
        <div className='container column px-5 font-style'>
          <h1 className='title has-text-centered mt-3'>Search For a Tutor</h1>
          <h3 className='subtitle is-4 mt-5'>Choose Your Search Criteria:</h3>
          <p className="mb-2 subtitle is-5">You may select as many search parameters as you like.</p>
          <Delivery handleInputChange={handleInputChange} />
          <Address handleInputChange={handleInputChange} />
          <Availability
            check={check}
            handleDaysCheckBoxes={handleDaysCheckBoxes}
            handleRemove={handleRemove}
          />
          <Subjects handleCheckboxes={handleCheckboxes} />
          <div className='field is-horizontal'>
            <div className='field-label'></div>
            <div className='field-body'>
              <div className='field'>
                <div className='control'>
                  <button onClick={findATutor} className='button is-info'>
                    Find a Tutor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
