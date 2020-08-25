import React from 'react';
import axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';
import Nav from '../components/Nav';


export default function Calendar(props){
    return (
        <>
        <Nav />
        <SideBarMenu />
        <h1 className='title'>Calendar</h1>
        </>
    )
}