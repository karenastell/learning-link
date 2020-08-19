import React from 'react';
import axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';

export default function ParentView(props){
    return (
        <>
        <SideBarMenu />
        <h1 className='title'>student dashboard</h1>
        </>
    )
}