import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/adminNavbar.css';
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom';
export default class navBar extends Component {
  render() {
    return (
      <div>
        <div className="navbarline">
          <nav className='navbar navbar-expand-lg navbar-light  text-secondary px-5 mb-5'>
            <div className='container-fluid'>
              <div className='navbar-brand text-warning '><img
            src={logo}
            className='img-thumbnail'
            alt='student photo'
            width='110'
            height='100'
          /></div>
              <div className='collapse navbar-collapse ' id='navbarScroll'>
                <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                  <li className='nav-item  px-5 text-white '>
                    <NavLink className=' nav-link'
                     style={{fontFamily: 'Roboto' , color:'#019707', fontWeight:'bold'}}
                     to='/adminRegister'>
                      ADMIN REGISTER
                    </NavLink>
                  </li>

                  <li className='nav-item  px-5'>
                    <NavLink className='nav-link '
                    style={{fontFamily: 'Roboto' , color:'#019707', fontWeight:'bold'}}
                     to='/login'>
                      LOGIN
                    </NavLink>
                  </li>

                  <li className='nav-item  px-5'>
                    <Link className='nav-link '
                    style={{fontFamily: 'Roboto' , color:'#019707', fontWeight:'bold'}}
                     to='/student'>
                      STUDENT
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
