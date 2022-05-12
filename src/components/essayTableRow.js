import { React, useState } from 'react'

import axios from 'axios'

const EssayTableRow = (props) => {
  const question = props.obj.question
  const question_no = props.obj.question_no
  const exam_name = props.obj.exam_name
  const [questionUp, setQuestionUp] = useState(question)
  const [questionFile, setQuestionFile] = useState('')
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
    }

    axios
      .put(
        'http://localhost:4000/question/update/essay' +
          question_no +
          '/' +
          exam_name,
        obj
      )
      .then((res) => {
        window.alert(res.data.exam_name)
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

        </div>
    </div>
  )
}

export default EssayTableRow
