import React from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import SideBarMenu from '../components/SideBarMenu';

export default function Messages(props){
    return (
        <>
        <Nav />
        <SideBarMenu />
        <h1 className='title'>messages</h1>
        </>
    )
}