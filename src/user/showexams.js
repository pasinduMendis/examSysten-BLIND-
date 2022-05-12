import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'


    const ShowExams = (props) => {
  
  const [exam,setExam]=useState([])
  

useEffect(()=> {
    axios
      .get('http://localhost:4000/exam/')
      .then((response) => {
        setExam(response.data )
      })
      .catch(function (err) {
        console.log(err)
      })
  },[])
  var today=new Date()
//console.log(today.getTime())
  const tabRow=()=> {
    return exam.map(function (object, i) {
      var examDate=object.exam_date.split('-')
      var Stime=object.exam_start.split(':')
      var Etime=object.exam_end.split(':')
      /* if(today.getFullYear()==examDate[0]&&today.getMonth() + 1==examDate[1]&&parseInt(today.getDate())+1 ==examDate[2]&&(
        ((today.getHours()>Stime[0]||(today.getHours()==Stime[0]&&today.getMinutes()>=Stime[1]))&&
        (today.getHours()<Etime[0]||(today.getHours()==Etime[0]&&today.getMinutes()<=Etime[1])))
        )){ */
          if(true){
      return  <tr  key={i}>
      <td className='text-dark'>
        <button className='btn btn-success' onClick={()=>{
        props.subject(object.exam_name)
        //console.log(object.exam_end.split(':'))
        //props.time((parseInt(object.exam_end.split(':')[0])-parseInt(object.exam_start.split(':')[0]))*60+(parseInt(object.exam_end.split(':')[1])-parseInt(object.exam_start.split(':')[1])))
        props.time(object.exam_end.split(':'))
        }}>
          {object.exam_name}
          </button>
          </td>
      <td className='text-dark'>{object.exam_date}</td>
      </tr>
      }
        
    })
  }


    return (
      <div className='container my-3'>
        <h2 className='text-dark fw-bold' align='center'>
          EXAM LIST
        </h2>
        <table className='table table-striped mt-5'>
          <thead>
            <tr>
              <th className='text-dark'>Exam Name</th>
              <th className='text-dark'>Exam Date</th>
            </tr>
          </thead>
          <tbody>{tabRow()}</tbody>
        </table>
      </div>
    )
  
}
export default ShowExams
