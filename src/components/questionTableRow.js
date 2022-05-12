import { React, useState } from 'react'

import axios from 'axios'

const StudentTableRow = (props) => {
  const question = props.obj.question
  const question_no = props.obj.question_no
  const exam_name = props.obj.exam_name
  const answerA = props.obj.answerA
  const answerB = props.obj.answerB
  const answerC = props.obj.answerC
  const answerD = props.obj.answerD
  const [questionUp, setQuestionUp] = useState(question)
  const [answerAUp, setAnswerAUp] = useState(answerA)
  const [answerBUp, setAnswerBUp] = useState(answerB)
  const [answerCUp, setAnswerCUp] = useState(answerB)
  const [answerDUp, setAnswerDUp] = useState(answerC)

  const [questionFile, setQuestionFile] = useState('')
  const [answerAFile, setAnswerAFile] = useState('')
  const [answerBFile, setAnswerBFile] = useState('')
  const [answerCFile, setAnswerCFile] = useState('')
  const [answerDFile, setAnswerDFile] = useState('')

  const [uploadedFile1, setUploadedFile1] = useState('')

  const SubmitQ = () => {
    const formData1 = new FormData()
    formData1.append('file', questionFile)
    try {
      const res = axios.post(
        'http://localhost:4000/api2/user-profile',
        formData1,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      const { fileName, filePath } = res.data
      setUploadedFile1(fileName, filePath)
    } catch (err) {
      console.log(err)
    }
    const obj = {
      question: questionUp,
      answerA: answerAUp,
      answerB: answerBUp,
      answerC: answerCUp,
      answerD: answerDUp,
    }

    axios
      .put(
        'http://localhost:4000/question/update/mcq' +
          question_no +
          '/' +
          exam_name,
        obj
      )
      .then((res) => {
        window.alert(res.data.exam_name)
      })
  }

  const SubmitB = () => {
    const formData1 = new FormData()
    formData1.append('file', answerBUp)
    try {
      const res = axios.post(
        'http://localhost:4000/api2/user-profile',
        formData1,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      const { fileName, filePath } = res.data
      setUploadedFile1(fileName, filePath)
    } catch (err) {
      console.log(err)
    }
    const obj = {
      question: questionUp,
      answerA: answerAUp,
      answerB: answerBUp,
      answerC: answerCUp,
      answerD: answerDUp,
    }

    axios
      .put(
        'http://localhost:4000/question/update/mcq' +
          question_no +
          '/' +
          exam_name,
        obj
      )
      .then((res) => {
        window.alert(res.data.exam_name)
      })
  }

  const SubmitA = () => {
    const formData1 = new FormData()
    formData1.append('file', answerAFile)
    try {
      const res = axios.post(
        'http://localhost:4000/api2/user-profile',
        formData1,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      const { fileName, filePath } = res.data
      setUploadedFile1(fileName, filePath)
    } catch (err) {
      console.log(err)
    }
    const obj = {
      question: questionUp,
      answerA: answerAUp,
      answerB: answerBUp,
      answerC: answerCUp,
      answerD: answerDUp,
    }

    axios
      .put(
        'http://localhost:4000/question/update/mcq' +
          question_no +
          '/' +
          exam_name,
        obj
      )
      .then((res) => {
        //window.alert(res.data.exam_name)
      })
  }

  const SubmitC = () => {
    const formData1 = new FormData()
    formData1.append('file', answerCFile)
    try {
      const res = axios.post(
        'http://localhost:4000/api2/user-profile',
        formData1,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      const { fileName, filePath } = res.data
      setUploadedFile1(fileName, filePath)
    } catch (err) {
      console.log(err)
    }
    const obj = {
      question: questionUp,
      answerA: answerAUp,
      answerB: answerBUp,
      answerC: answerCUp,
      answerD: answerDUp,
    }

    axios
      .put(
        'http://localhost:4000/question/update/mcq' +
          question_no +
          '/' +
          exam_name,
        obj
      )
      .then((res) => {
        //window.alert(res.data.exam_name)
      })
  }

  const SubmitD = () => {
    const formData1 = new FormData()
    formData1.append('file', answerDFile)
    try {
      const res = axios.post(
        'http://localhost:4000/api2/user-profile',
        formData1,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      const { fileName, filePath } = res.data
      setUploadedFile1(fileName, filePath)
    } catch (err) {
      console.log(err)
    }
    const obj = {
      question: questionUp,
      answerA: answerAUp,
      answerB: answerBUp,
      answerC: answerCUp,
      answerD: answerDUp,
    }

    axios
      .put(
        'http://localhost:4000/question/update/mcq/' +
          question_no +
          '/' +
          exam_name,
        obj
      )
      .then((res) => {
        //window.alert(res.data.exam_name)
      })
  }

  return (
    <div className='container'>
      <div className='border border-warning rounded my-3 px-5 py-5'>
        <h4 className='text-dark'>QUESTION NUMBER : {question_no}</h4>
        <div className='row'>
          <div className='col'>
            <h4 className='text-dark mt-3'>QUESTION :</h4>
            <audio controls>
              <source
                src={'http://localhost:4000/Auploads\\' + questionUp}
                type='audio/mpeg'
              />
            </audio>
          </div>
          <div className='col mt-4'>
            <form onSubmit={SubmitQ}>
              <input
                required
                type='file'
                accept='.mp3'
                class='form-control mt-4'
                id='customFile'
                onChange={(e) => {
                  setQuestionUp(
                    e.target.files[0].name.toLowerCase().split(' ').join('-')
                  )
                  setQuestionFile(e.target.files[0])
                }}
              />

              <div className='d-flex justify-content-center mx-3  mb-lg-4'>
                <button className='btn btn-success btn-sm' type='submit'>
                  EDIT QUESTION
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <h4 className='text-dark mt-3'>ANSWER A :</h4>
            <audio controls>
              <source
                src={'http://localhost:4000/Auploads\\' + answerAUp}
                type='audio/mpeg'
              />
            </audio>
          </div>
          <div className='col mt-4'>
            <form onSubmit={SubmitA}>
              <input
                required
                type='file'
                accept='.mp3'
                class='form-control mt-4'
                id='customFile'
                onChange={(e) => {
                  setAnswerAUp(
                    e.target.files[0].name.toLowerCase().split(' ').join('-')
                  )
                  setAnswerAFile(e.target.files[0])
                }}
              />

              <div className='d-flex justify-content-center mx-3  mb-lg-4'>
                <button className='btn btn-success btn-sm' type='submit'>
                  EDIT ANSWER A
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <h4 className='text-dark mt-3'>ANSWER B :</h4>
            <audio controls>
              <source
                src={'http://localhost:4000/Auploads\\' + answerBUp}
                type='audio/mpeg'
              />
            </audio>
          </div>
          <div className='col mt-4'>
            <form onSubmit={SubmitB}>
              <input
                required
                type='file'
                accept='.mp3'
                class='form-control mt-4'
                id='customFile'
                onChange={(e) => {
                  setAnswerBUp(
                    e.target.files[0].name.toLowerCase().split(' ').join('-')
                  )
                  setAnswerBFile(e.target.files[0])
                }}
              />
              <div className='d-flex justify-content-center mx-3  mb-lg-4'>
                <button className='btn btn-success btn-sm' type='submit'>
                  EDIT ANSWER B
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <h4 className='text-dark mt-3'>ANSWER C :</h4>
            <audio controls>
              <source
                src={'http://localhost:4000/Auploads\\' + answerCUp}
                type='audio/mpeg'
              />
            </audio>
          </div>
          <div className='col mt-4'>
            <form onSubmit={SubmitC}>
              <input
                required
                type='file'
                accept='.mp3'
                class='form-control mt-4'
                id='customFile'
                onChange={(e) => {
                  setAnswerCUp(
                    e.target.files[0].name.toLowerCase().split(' ').join('-')
                  )
                  setAnswerCFile(e.target.files[0])
                }}
              />
              <div className='d-flex justify-content-center mx-3  mb-lg-4'>
                <button className='btn btn-success btn-sm' type='submit'>
                  EDIT ANSWER C
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <h4 className='text-dark mt-3'>ANSWER D :</h4>
            <audio controls>
              <source
                src={'http://localhost:4000/Auploads\\' + answerDUp}
                type='audio/mpeg'
              />
            </audio>
          </div>
          <div className='col mt-4'>
            <form onSubmit={SubmitD}>
              <input
                required
                type='file'
                accept='.mp3'
                class='form-control mt-4'
                id='customFile'
                onChange={(e) => {
                  setAnswerDUp(
                    e.target.files[0].name.toLowerCase().split(' ').join('-')
                  )
                  setAnswerDFile(e.target.files[0])
                }}
              />
              <div className='d-flex justify-content-center mx-3  mb-lg-4'>
                <button className='btn btn-success btn-sm' type='submit'>
                  EDIT ANSWER D
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentTableRow
