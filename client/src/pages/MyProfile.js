import React from 'react';
import axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';

export default function MyProfile(props){
    // will need some state here to handle the editing capabilities

    // will need to get the user's profile data from the database
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