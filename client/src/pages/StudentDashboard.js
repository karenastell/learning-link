import React from 'react';
import Nav from '../components/Nav';

import axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';

export default function ParentView(props){
    return (
        <>
        <Nav />
        <SideBarMenu />
        <h1 className='title'>student dashboard</h1>
        </>
    )
}