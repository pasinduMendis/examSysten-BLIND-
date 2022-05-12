import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css'
import Login from './components/login'
import StRegister from './components/stRegister'
import AdminRegister from './components/adminRegister'
import DisplayStudent from './components/displayStdunet'
import StudentProfile from './components/stProfile'
import AdminProfile from './components/adminProfile'
import AdminNavbar from './components/adminNavbar'
import ExamAdd from './components/addExam'
import DisplayExams from './components/showExams'
import AddQues from './components/addQues'
import DisplayQuestion from './components/showQuestion'
import DisplayEssay from './components/showEssay'
import Navbar from './components/navBar'
import Speech from './user/index'



function App() {


  return (
    <div  >
  
  <BrowserRouter>
        <Switch>
          <Route path='/stRegister'>
            <AdminNavbar />
            <StRegister />
          </Route>

          <Route path='/exams'>
            <AdminNavbar />
            <DisplayExams />
          </Route>

          <Route path='/student'>
            <Speech />
          </Route>

          <Route path='/addQuestion/:id'>
            <AdminNavbar />
            <AddQues />
          </Route>

          <Route path='/showEssay/:id'>
            <AdminNavbar />
            <DisplayEssay />
          </Route>

          <Route path='/showQuestion/:id'>
            <AdminNavbar />
            <DisplayQuestion />
          </Route>

          <Route path='/adminRegister'>
            <Navbar />
            <AdminRegister />
          </Route>

          <Route path='/addExam'>
            <AdminNavbar />
            <ExamAdd />
          </Route>

          <Route path='/profile/:stId'>
            <AdminNavbar />
            <StudentProfile />
          </Route>

          <Route path='/students'>
            <AdminNavbar />
            <DisplayStudent />
          </Route>

          <Route path='/adminProfile/:adId'>
            <AdminNavbar />
            <AdminProfile />
          </Route>

          <Route path='/login'>
            <Navbar />
            <Login />
          </Route>

          <Route path='/'>
            <Navbar />
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
      
    </div>
  )
}

export default App
