import React from 'react';
import axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';

export default function MyProfile(props){
    return (
        <>
        <SideBarMenu />
        <h1 className='title'>my profile</h1>
        </>
    )
}