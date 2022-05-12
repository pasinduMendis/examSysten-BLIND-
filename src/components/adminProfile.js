import { React, useState, useEffect } from 'react'
//import { Link } from 'react-router-dom'
import TopNav from "../components/topnav/TopNav";

import axios from 'axios'

const Main = () => {
  const [admin, setAdmin] = useState({})
  const [photo, setPhoto] = useState('')
  const [uploadedPhoto, setUploadedPhoto] = useState('')
  const [photoName, setPhotoName] = useState('')

  var url = window.location.pathname
  var id = url.substring(url.lastIndexOf('/') + 1)

  useEffect(() => {
    axios
      .get('http://localhost:4000/admin/get/' + id)
      .then((response) => {
        setAdmin(response.data)
        localStorage.setItem("id", response.data.admin_id);

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
        .put('http://localhost:4000/admin/update2/' + admin.admin_id, obj)
        .then((res) => {
          // window.alert(res.data.admin_name)
          setAdmin(res.data)
        })
    }
  }
  return (
    
    <div className='container text-warning  pb-5'>
      <div className='row'>
        <div className="col-6">
          <div className="card full-height">
          <img
            src={'http://localhost:4000/Iuploads\\' + admin.photoName}
            className='img-thumbnail border-primary border-3'
            alt='student photo'
            width='300'
            height='300'
          />
          <form onSubmit={Submit}>
          <label class='form-label' for='customFile'>
            Upload New Photo
          </label>
          <input
            type='file'
            accept='.png,.jpg,.jpeg'
            class='form-control border-primary border-3'
            id='customFile'
            onChange={(e) => {
              setPhotoName(e.target.files[0].name)
              setPhoto(e.target.files[0])
            }}
          />
          &nbsp;
          <br/>
          <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
         
            <button className='btn btn-success' type='submit'>
              UPDATE PHOTO
            </button>
          </div>
        </form>
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
          <div className='text-center col-md-12 row '>
          <div className='mt-3 '>
            <h1 className='adminprofile1'>NAME : </h1>
            <h2 className='adminprofile'> {admin.admin_name} </h2>
          </div>
          <div className='mt-3'>
            <h1 className='adminprofile1'>EMAIL :</h1>
            <h2 className='adminprofile'> {admin.admin_email}</h2>
          </div>
          <div className='mt-3'>
            <h1 className='adminprofile1'> ID :</h1>
            <h2 className='adminprofile'> {admin.admin_id}</h2>
          </div>
        </div>
          </div>
        </div>
        
      </div>
      <div>
        {/* <div className='justify-content-around mt-5'>
          <Link to={''} className='btn btn-warning mx-5'>
            Students
          </Link>

          <Link to={''} className='btn btn-primary mx-5'>
            ADD EXAM
          </Link>
        </div> */}
      </div>
    </div>
    
  )
}

export default Main
