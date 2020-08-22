import React, { useEffect, useContext } from 'react';
import Axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';
import { AuthContext } from '../AuthContext';

export default function MyProfile(props){
    // get the userId from context
    const { userId } = useContext(AuthContext);
    // will need some state here to handle the editing capabilities
console.log(userId)
    // will need to get the user's profile data from the database
    // useEffect(() => {
    //     Axios.get('/api/my-profile').then((response) => {
    //         console.log(response);
    //     });
    // }, []);

    // Will need to have PUT requests to update items if the user makes edits.
    return (
        <>
        <SideBarMenu />
        <h1 className='title'>my profile</h1>
        <div className='container mt-5 mb-5'>
            {/* Display each field from the database (obv not the password) */}
            {/* have an edit button after each item? or one edit button that allows all items to be editable? */}
        </div>
        </>
    )
}