import { React, useState, useEffect } from 'react'

import axios from 'axios'

const Main = () => {
  const [student, setStudent] = useState({})
  const [photo, setPhoto] = useState('')
  const [uploadedPhoto, setUploadedPhoto] = useState('')
  const [photoName, setPhotoName] = useState('')
  const [edit,setEdit]=useState(false)
  const [studentName, setStudentName] = useState('')
  const [studentEmail, setStudentEmail] = useState('')
  const [studentDrive, setStudentDrive] = useState('')
  const [studentMob, setStudentMob] = useState('')
  const [studentAdr, setStudentAdr] = useState('')

  var url = window.location.pathname
  var id = url.substring(url.lastIndexOf('/') + 1)

  useEffect(() => {
    axios
      .get('http://localhost:4000/student/check/' + id)
      .then((response) => {
        setStudent(response.data)
        setStudentName(response.data.student_name)
        setStudentEmail(response.data.student_email)
        setStudentAdr(response.data.address)
        setStudentMob(response.data.mobile)
        console.log(response.data)

        //window.alert(response.data.student_name)
      })
      .catch(function (err) {
        console.log(err)
      })
  }, [])

  const Submit = () => {
    const formData = new FormData()
    formData.append('file', photo)
    try {
      const res = axios.post(
        'http://localhost:4000/api/user-profile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      const { fileName, filePath } = res.data
      setUploadedPhoto(fileName, filePath)
    } catch (err) {
      console.log(err)
    }

    const obj = { photoName: photoName }

    if (obj.photoName == null || obj.photoName == '') {
      window.alert('please select correct photo')
    } else {
      axios
        .put('http://localhost:4000/student/update/' + student.student_id, obj)
        .then((res) => {
          setStudent(res.data)
        })
    }
  }
  const onSubmit=()=>{
    const obj={
      student_name: studentName,
      student_email: studentEmail,
      googleDrive: studentDrive,
      mobile:studentMob,
      address:studentAdr,
    }
    axios
        .put('http://localhost:4000/student/update/' + student.student_id, obj)
        .then((res) => {
          setStudent(res.data)
          setEdit(false)
        })

  }
  return (
    <div className='container text-warning'>
      {edit?<form className='mx-1 mx-md-4' onSubmit={onSubmit}>
                          <div className='d-flex flex-row align-items-center mb-4'>
                            <i className='fas fa-user fa-lg me-3 fa-fw' />
                            <div className='form-outline flex-fill mb-0'>
                              <input
                                required
                                type='text'
                                id='form3Example1c'
                                className='form-control border-primary border-3'
                                value={studentName}
                                onChange={(e)=>{setStudentName(e.target.value)}}
                              />
                              <label
                                className='form-label'
                                htmlFor='form3Example1c'
                              >
                                Student Name
                              </label>
                            </div>
                          </div>
                          <div className='d-flex flex-row align-items-center mb-4'>
                            <i className='fas fa-envelope fa-lg me-3 fa-fw' />
                            <div className='form-outline flex-fill mb-0'>
                              <input
                                required
                                type='email'
                                id='form3Example3c'
                                className='form-control border-primary border-3'
                                value={studentEmail}
                                onChange={(e)=>{setStudentEmail(e.target.value)}}
                              />
                              <label
                                className='form-label'
                                htmlFor='form3Example3c'
                              >
                                Student Email
                              </label>
                            </div>
                          </div>


                          <div className='d-flex flex-row align-items-center mb-4'>
                            <i className='fas fa-lock fa-lg me-3 fa-fw' />
                            <div className='form-outline flex-fill mb-0'>
                              <input
                                required
                                type='Text'
                                id='form3Example4c'
                                className='form-control border-primary border-3'
                                value={studentDrive}
                                onChange={(e)=>{setStudentDrive(e.target.value)}}
                              />
                              <label
                                className='form-label'
                                htmlFor='form3Example4c'
                              >
                                Drive Link
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
                                value={studentAdr}
                                onChange={(e)=>{setStudentAdr(e.target.value)}}
                              />
                              <label
                                className='form-label'
                                htmlFor='form3Example1c'
                              >
                                Address
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
                                value={studentMob}
                                onChange={(e)=>{setStudentMob(e.target.value)}}
                              />
                              <label
                                className='form-label'
                                htmlFor='form3Example1c'
                              >
                                Tel No:
                              </label>
                            </div>
                          </div>

                          <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                            <button
                              type='submit'
                              className='btn btn-primary btn-lg'
                            >
                              UPDATE
                            </button>
                          </div>
                        </form>
      :
      <div className='row'>
        <div className="col-6">
          <div className="card full-height">
        <div className='text-center col-md-12 mt-5 mb-5'>
          <img
            src={'http://localhost:4000/Iuploads\\' + student.photoName}
            className='img-thumbnail border-primary border-3'
            alt='student photo'
            width='300'
            height='300'
          />
        </div>
        
        <form onSubmit={Submit}>
          <label class='form-label' for='customFile'>
            Upload New Photo
          </label>
          <input
            type='file'
            class='form-control border-primary border-3'
            accept='.png,.jpg,.jpeg'
            id='customFile'
            onChange={(e) => {
              setPhotoName(
                e.target.files[0].name.toLowerCase().split(' ').join('-')
              )
              setPhoto(e.target.files[0])
            }}
          />
          <br/>
          <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
            <button className='btn btn-success btn-sm' type='submit'>
              UPDATE PHOTO
            </button>
          </div>
        </form>

        <button className='btn btn-primary btn-sm' type='btn' onClick={()=>setEdit(true)}>
              Edit Profile Data
            </button>
        </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
        <div className='text-center col-md-12 row'>
          <div className='mt-3'>
            <h1 className='adminprofile1'>STUDENT NAME : </h1>
            <h2>{student.student_name} </h2>
          </div>
          <div className='mt-3'>
            <h1 className='adminprofile1'>STUDENT Email : </h1>
            <h2> {student.student_email} </h2>
          </div>
          <div className='mt-3'>
            <h1 className='adminprofile1'>STUDENT ID : </h1>
            <h2>{student.student_id} </h2>
          </div>
          <div className='mt-3'>
            <h1 className='adminprofile1'>Address : </h1>
            <h2>{student.address} </h2>
          </div>
          <div className='mt-3'>
            <h1 className='adminprofile1'>Tel no: : </h1>
            <h2>{student.mobile} </h2>
          </div>
          <div className='mt-3'>
            <h1 className='adminprofile1'>Google Drive Link: : </h1>
            <h2>{student.googleDrive} </h2>
          </div>
        </div>
      </div>
    </div>
    </div>
    }
    </div>
  )
}

export default Main
