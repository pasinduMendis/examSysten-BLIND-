import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/adminNavbar.css';
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom';

export default class navBar extends Component {
  render() {
    const id = localStorage.getItem("id")
    const styles = {
      well: {
        fontFamily:'Roboto',
        color:'black',
        fontweight:'bold',
        backgroundColor:'#ff4a6b',
        borderRadius:'10px',
        boxShadow: `rgba(149, 157, 165, 0.2) 0px 8px 24px`,
      },
    };
    return (
      <div >
        <div className="navbarline">
          <nav className='navbar navbar-expand-lg navbar-light  px-5 mb-5 navbarline'>
            <div className='container-fluid'>
              <div style={{fontFamily:'Roboto' , fontWeight:'bolder' , color:'black', fontSize:'30px'}} className='navbar-brand'><img
            src={logo}
            className='img-thumbnail'
            alt='student photo'
            width='110'
            height='100'
          /></div>
              <div className='collapse navbar-collapse' id='navbarScroll'>
                <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                  <li  className='nav-item mx-5'>
                    <NavLink
                      style={{fontFamily: 'Roboto' , color:'#019707', fontWeight:'bold'}}
                      className='nav-link navitems'
                      activeClassName="active"
                      to='/stRegister'
                    >
                      STUDENT REGISTER
                    </NavLink>
                  </li>
                  <li className='nav-item  px-5'>
                    <NavLink
                      style={{fontFamily: 'Roboto' , color:'#06518c', fontWeight:'bold'}}
                      className='nav-link navitems1'
                      activeClassName="active"
                      to='/students'
                    >
                      STUDENTS
                    </NavLink>
                  </li>

                  <li className='nav-item  px-5'>
                    <NavLink
                      style={{fontFamily: 'Roboto' , color:'#019707', fontWeight:'bold'}}
                      className='nav-link navitems'
                      activeClassName="active"
                      to='/addExam'
                    >
                      ADD EXAM
                    </NavLink>
                  </li>

                  <li className='nav-item  px-5'>
                    <NavLink
                      style={{fontFamily: 'Roboto' , color:'#019707', fontWeight:'bold'}}
                      className='nav-link navitems'
                      activeClassName="active"
                      to='/exams'
                    >
                      ADD QUESTIONS
                    </NavLink>
                  </li>
                  </ul>
                  <ul class="nav justify-content-end">
                  <li className='nav-item  px-5'>
                    <NavLink
                      style={{fontFamily: 'Roboto' , color:'#019707', fontWeight:'bold'}}
                      className='nav-link navitems'
                      activeClassName="active"
                      to={`/adminProfile/${id}`}
                    >
                      PROFILE
                    </NavLink>
                  </li>
                  <li className='nav-item  px-5'>
                    <Link
                      style={styles.well}
                      // style={{fontFamily: 'Roboto' , color:'black', fontWeight:'bold', backgroundColor:'#ff4a6b', borderRadius:'10px'}}
                      className='nav-link '

                      to='/login'
                    >
                      LOG OUT
                    </Link>
                  </li>
                  </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}
