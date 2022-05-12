import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Alert } from 'antd';
import axios from 'axios'

const AddQuestion = () => {
  var url = window.location.pathname
  var id = url.substring(url.lastIndexOf('/') + 1)

  const [question, setQuestion] = useState('')
  const [questionEssay, setQuestionEssay] = useState('')
  const [questionNum, setQuestionNum] = useState(1)
  const [questionNumEssay, setQuestionNumEssay] = useState(1)
  const [answerA, setAnswerA] = useState('')
  const [answerB, setAnswerB] = useState('')
  const [answerC, setAnswerC] = useState('')
  const [answerD, setAnswerD] = useState('')
  const [answerCorrect, setAnswerCorrect] = useState('')
  const [questionName, setQuestionName] = useState('')
  const [answerAName, setAnswerAName] = useState('')
  const [answerBName, setAnswerBName] = useState('')
  const [answerCName, setAnswerCName] = useState('')
  const [answerDName, setAnswerDName] = useState('')
  const [uploadedFile1, setUploadedFile1] = useState('')
  const [uploadedFile2, setUploadedFile2] = useState('')
  const [uploadedFile3, setUploadedFile3] = useState('')
  const [uploadedFile4, setUploadedFile4] = useState('')
  const [uploadedFile5, setUploadedFile5] = useState('')
  const [uploadedFileEssay, setUploadedFileEssay] = useState('')
  const [mcq, setMcq] = useState(true)
  const [alert, setAlert] = useState('')


  useEffect(() => {
    axios.get('http://localhost:4000/question/check5/' + id).then((res) => {
      var No_mcq=1;
      var No_ess=1;
      console.log(res.data)
      if(res.data != 'unavailable'){
        //console.log(res.data)
      res.data.length>0?
       res.data.map((item,id)=>{
         //console.log(item)
        if(item.type=='mcq'){
          No_mcq++
        }
      else{
        No_ess++
      }
      }) :
      console.log('')
      }
      setQuestionNum(No_mcq)
      setQuestionNumEssay(No_ess)
      
     
      // window.alert('test')
    })
  }, [])

  var qNumber = questionNum
  var qNumEssay=questionNumEssay
  const onClose = (e) => {
    setAlert('');
  };
  const SubmitEssay = () => {
    const formData1 = new FormData()
    formData1.append('file', questionEssay)
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
      setUploadedFileEssay(fileName, filePath)
    } catch (err) {
      console.log(err)
    }

    

    const obj = {
      question_no: qNumEssay,
      question: questionName,
      type:'essay',
      exam_name: decodeURI(id),
    }

    axios.post('http://localhost:4000/question/add', obj).then((res) => {
     setAlert(res.data)
    })

    setQuestion('')
    setAnswerA('')
    setAnswerB('')
    setAnswerD('')
    setAnswerC('')
    setAnswerCorrect('')
    setQuestionNum('')
    setQuestionNumEssay('')
  }


  const SubmitMcq = () => {
    const formData1 = new FormData()
    formData1.append('file', questionEssay)
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

    const formData2 = new FormData()
    formData2.append('file', answerA)
    try {
      const res = axios.post(
        'http://localhost:4000/api2/user-profile',
        formData2,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      const { fileName, filePath } = res.data
      setUploadedFile2(fileName, filePath)
    } catch (err) {
      console.log(err)
    }

    const formData3 = new FormData()
    formData3.append('file', answerB)
    try {
      const res = axios.post(
        'http://localhost:4000/api2/user-profile',
        formData3,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      const { fileName, filePath } = res.data
      setUploadedFile3(fileName, filePath)
    } catch (err) {
      console.log(err)
    }

    const formData4 = new FormData()
    formData4.append('file', answerC)
    try {
      const res = axios.post(
        'http://localhost:4000/api2/user-profile',
        formData4,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      const { fileName, filePath } = res.data
      setUploadedFile4(fileName, filePath)
    } catch (err) {
      console.log(err)
    }

    const formData5 = new FormData()
    formData5.append('file', answerD)
    try {
      const res = axios.post(
        'http://localhost:4000/api2/user-profile',
        formData5,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      const { fileName, filePath } = res.data
      setUploadedFile5(fileName, filePath)
    } catch (err) {
      console.log(err)
    }

    const obj = {
      question_no: qNumber,
      question: questionName,
      answerA: answerAName,
      answerB: answerBName,
      answerC: answerCName,
      answerD: answerDName,
      correct_answer:answerCorrect,
      type:'mcq',
      exam_name: decodeURI(id),
    }

    axios.post('http://localhost:4000/question/add', obj).then((res) => {
      setAlert(res.data)
    })

    setQuestion('')
    setAnswerA('')
    setAnswerB('')
    setAnswerD('')
    setAnswerC('')
    setAnswerCorrect('')
    setQuestionNum('')
  }


  return (<>
  <div className='row justify-content-around mx-auto'>
          <button className='btn btn-primary btn-lg col-4 mx-3 ' type='submit' onClick={()=>setMcq(true)}>
           MCQ
          </button>
          <button className='btn btn-primary btn-lg col-4 ' type='submit' onClick={()=>setMcq(false)}>
            ESSAY
          </button>
  </div>
  {alert ? <Alert
      message={alert}
      type="warning"
      closable
      onClose={onClose}
    />: null}
    <br/>
  { mcq?
    <div className='container pb-5'>
    <div className="card full-height">
      <form onSubmit={SubmitMcq}>
        <label className='form-label text-dark mt-3'>
          Question Number
        </label>
        <h3 className='text-dark'>{qNumber}</h3>

        <label className='form-label text-dark mt-3' >
          Question
        </label>
        <input
          required
          type='file'
          accept='.mp3'
          className='form-control border-primary border-3'
          id='customFile'
          onChange={(e) => {
            setQuestionName(
              e.target.files[0].name.toLowerCase().split(' ').join('-')
            )
            setQuestion(e.target.files[0])
          }}
        />

        <label className='form-label text-dark mt-3'>
          Answer A
        </label>
        <input
          required
          type='file'
          accept='.mp3'
          className='form-control border-primary border-3'
          id='customFile'
          onChange={(e) => {
            setAnswerAName(
              e.target.files[0].name.toLowerCase().split(' ').join('-')
            )
            setAnswerA(e.target.files[0])
          }}
        />

        <label className='form-label text-dark mt-3'>
          Answer B
        </label>
        <input
          required
          type='file'
          accept='.mp3'
          className='form-control border-primary border-3'
          id='customFile'
          onChange={(e) => {
            setAnswerBName(
              e.target.files[0].name.toLowerCase().split(' ').join('-')
            )
            setAnswerB(e.target.files[0])
          }}
        />

        <label className='form-label text-dark mt-3' >
          Answer C
        </label>
        <input
          required
          type='file'
          accept='.mp3'
          className='form-control border-primary border-3'
          id='customFile'
          onChange={(e) => {
            setAnswerCName(
              e.target.files[0].name.toLowerCase().split(' ').join('-')
            )
            setAnswerC(e.target.files[0])
          }}
        />

        <label className='form-label text-dark mt-3'>
          Answer D
        </label>
        <input
          required
          type='file'
          accept='.mp3'
          className='form-control border-primary border-3'
          id='customFile'
          onChange={(e) => {
            setAnswerDName(
              e.target.files[0].name.toLowerCase().split(' ').join('-')
            )
            setAnswerD(e.target.files[0])
          }}
        />


<label className='form-label text-dark mt-3' >
          correct Answer(A,B,C,D)
        </label>
        <select
        className='btn btn-Light border-warning btn-lg px-5 m-3'
        onChange={(e) => {
          setAnswerCorrect(e.target.value)
        }}
      >
        <option value='A'>A</option>
        <option value='B'>B</option>
        <option value='C'>C</option>
        <option value='D'>D</option>
      </select>

        <div className='d-flex justify-content-center mx-4 mb-3 mt-5 mb-lg-4'>
          <button className='btn btn-success btn-lg ' type='submit'>
            ADD
          </button>
        </div>
      </form>
      </div>
    </div>
    :
    <div>
    
          
      <div className='container pb-5'>
      <div className="card full-height">
      <form onSubmit={SubmitEssay}>
        <label className='form-label text-dark mt-3'>
          Question Number
        </label>
        <h3 className='text-dark'>{qNumEssay}</h3>

        <label className='form-label text-dark mt-3' >
          Question
        </label>
        <input
          required
          type='file'
          accept='.mp3'
          className='form-control border-primary border-3'
          id='customFile'
          onChange={(e) => {
            setQuestionName(
              e.target.files[0].name.toLowerCase().split(' ').join('-')
            )
            setQuestion(e.target.files[0])
          }}
        />
        <div className='d-flex justify-content-center mx-4 mb-3 mt-5 mb-lg-4'>
          <button className='btn btn-success btn-lg ' type='submit'>
            ADD
          </button>
        </div>
      </form>
    </div>
      </div>
      
      </div>}
    </>
  )
}
export default AddQuestion
