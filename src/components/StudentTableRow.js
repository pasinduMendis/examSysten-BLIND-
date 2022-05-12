import React, { Component, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const StudentTableRow =(props)=> {

      var student_name= props.obj.student_name
      var student_email=props.obj.student_email
      var student_id= props.obj.student_id

    return (
      <>
      {
      <tr>
        <td className='text-dark'>{student_name}</td>
        <td className='text-dark'>{student_email}</td>
        <td className='text-dark'>{student_id}</td>
        <td>
          <Link
            to={'/profile/' + student_id}
            className='btn btn-primary'
          >
            profile
          </Link>
        </td>
        <td>
          <button className='btn btn-success'
          onClick={()=>{props.stId(student_id)}}>Results</button>
        </td>
        <td>
          <Link
            to={'/DisplayStudent'}
            className='btn btn-danger'
            onClick={() => {
              axios
                .delete(
                  'http://localhost:4000/student/delete/' + props.obj._id
                )
                .catch((err) => console.log(err))
           
                student_name=props.obj.student_name
                student_email=props.obj.student_email
                student_id=props.obj.student_id
              
              window.location.reload(true)
            }}
          >
            Delete
          </Link>
        </td>
      </tr>
          }
          </>
    )
  }

export default StudentTableRow