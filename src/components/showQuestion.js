import { React, useState, useEffect } from 'react'
import axios from 'axios'
import TableRow from './questionTableRow'

const ShowQuestions = () => {
  var url = window.location.pathname
  var id = url.substring(url.lastIndexOf('/') + 1)
  const [questions, setQuestions] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:4000/question/check/mcq/' + id)
      .then((response) => {
        setQuestions(response.data)
      })
      .catch(function (err) {
        console.log(err)
      })
  }, [])
  const tabRow = () => {
    if(questions !='unavailable'){
    return questions.map(function (object, i) {
      return <TableRow obj={object} key={i} />
    })}else{
      return <h1>No Question Added</h1>
    }
  }


  return (
    <div className='container'>
      <h2 className='text-warning fw-bold' align='center'>
        QUESTION LIST
      </h2>

      <div>{tabRow()}</div>
    </div>
  )
}
export default ShowQuestions
