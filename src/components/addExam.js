import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Alert } from 'antd';
import axios from 'axios'



const AddExam = () => {
  
  const [examName, setExamName] = useState('')
  const [examId, setExamId] = useState('')
  const [examStime, setExamStime] = useState('')
  const [examEtime, setExamEtime] = useState('')
  const [examDate, setExamDate] = useState('')
  const [alert, setAlert] = useState('')
  // const [time, setDate] = useState('0')

  const today = new Date()
  var date = '0'
  const day = parseInt(today.getDate()) + 1
  if (today.getMonth() + 1 < 10) {
    if (today.getDate() < 10) {
      date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + day

      //const time = today.getHours() + ':' + today.getMinutes()
    } else {
      date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + day

      //const time = today.getHours() + ':' + today.getMinutes()
    }
  } else {
    if (today.getDate() < 10) {
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-0' + day

      //const time = today.getHours() + ':' + today.getMinutes()
    } else {
      date=(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + day)

      //const time = today.getHours() + ':' + today.getMinutes()
    }
  }

  const onClose = (e) => {
    // setAlert('');
  };

  const Submit = () => {
    const obj = {
      exam_name: examName,
      exam_date: examDate,
      exam_start: examStime,
      exam_end: examEtime,
      instructer_id: examId,
    }

    axios.post('http://localhost:4000/exam/add', obj).then((res) => {
      setAlert(res.data)
    })

    //window.alert(date)

    setExamDate('')
    setExamEtime('')
    setExamId('')
    setExamStime('')
    setExamName('')
  }

  return (
    <div className='container pb-5'>
     <div className="card full-height">
    {alert ? <Alert
      message={alert}
      type="warning"
      closable
      onClose={onClose}
    />: null}
    <br/>
      <form className='mx-1 mx-md-4' onSubmit={Submit}>
      
        <div className='d-flex flex-row align-items-center mb-4'>
          <i className='fas fa-user fa-lg me-3 fa-fw' />
          <div className='form-outline flex-fill mb-0'>
            <input
              required
              type='text'
              id='form3Example1c'
              className='form-control border-primary border-3'
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
            />
            <label className='form-label text-dark' htmlFor='form3Example1c'>
              Exam Name
            </label>
          </div>
        </div>

        <div className='d-flex flex-row align-items-center mb-4'>
          <i className='fas fa-user fa-lg me-3 fa-fw' />
          <div className='form-outline flex-fill mb-0'>
            <input
              required
              type='text'
              id='form3Example1c'
              className='form-control border-primary border-3'
              value={examId}
              onChange={(e) => setExamId(e.target.value)}
            />
            <label className='form-label text-dark' htmlFor='form3Example1c'>
              Instructor ID
            </label>
          </div>
        </div>
        <div className='d-flex flex-row align-items-center mb-4'>
          <i className='fas fa-envelope fa-lg me-3 fa-fw' />
          <div className='form-outline flex-fill mb-0'>
            <input
              required
              type='date'
              min={date}
              id='form3Example3c'
              className='form-control border-primary border-3'
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
            />
            <label className='form-label text-dark' htmlFor='form3Example3c'>
              Date
            </label>
          </div>
        </div>
        <div className='d-flex flex-row align-items-center mb-4'>
          <i className='fas fa-lock fa-lg me-3 fa-fw' />
          <div className='form-outline flex-fill mb-0'>
            <input
              required
              type='time'
              // min={time}
              id='form3Example4c'
              className='form-control border-primary border-3'
              value={examStime}
              onChange={(e) => setExamStime(e.target.value)}
            />
            <label className='form-label text-dark' htmlFor='form3Example4c'>
              Exam Start Time
            </label>
          </div>
        </div>
        <div className='d-flex flex-row align-items-center mb-4'>
          <i className='fas fa-key fa-lg me-3 fa-fw' />
          <div className='form-outline flex-fill mb-0'>
            <input
              type='time'
              min={examStime}
              id='form3Example4cd'
              className='form-control border-primary border-3'
              value={examEtime}
              onChange={(e) => setExamEtime(e.target.value)}
            />
            <label className='form-label text-dark' htmlFor='form3Example4cd'>
              Exam End Time
            </label>
          </div>
        </div>

        <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
          <button type='submit' className='btn btn-primary btn-lg'>
            ADD EXAM
          </button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default AddExam
