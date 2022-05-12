import React, { Component } from 'react'

import axios from 'axios'

export default class register extends Component {
  constructor(props) {
    super(props)
    this.onChangeStudentName = this.onChangeStudentName.bind(this)
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this)
    this.onChangeStudentId = this.onChangeStudentId.bind(this)
    this.onChangePhotoName = this.onChangePhotoName.bind(this)
    this.onChangePhoto = this.onChangePhoto.bind(this)
    this.onChangeUploadedPhoto = this.onChangeUploadedPhoto.bind(this)
    this.onChangeGoogleDrive = this.onChangeGoogleDrive.bind(this)
    this.onChangeMobile = this.onChangeMobile.bind(this)
    this.onChangeAddress = this.onChangeAddress.bind(this)
    this.onChange1 = this.onChange1.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      student_name: '',
      student_email: '',
      student_id: '',
      photoName: '',
      photo: '',
      uploadedPhoto: '',
      googleDrive:'',
      mobile:'',
      address:'',
    }
  }

  onChangeStudentName(e) {
    this.setState({
      student_name: e.target.value,
    })
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    })
  }

  onChangeMobile(e) {
    this.setState({
      mobile: e.target.value,
    })
  }

  onChangeGoogleDrive(e) {
    this.setState({
      googleDrive: e.target.value,
    })
  }

  onChangeStudentEmail(e) {
    this.setState({
      student_email: e.target.value,
    })
  }

  onChangeStudentId(e) {
    this.setState({
      student_id: e.target.value,
    })
  }

  onChange1 = (e) => {
    this.setState({
      photoName: e.target.files[0].name.toLowerCase().split(' ').join('-'),
      photo: e.target.files[0],
    })
  }

  onChangePhotoName(e) {
    this.setState({
      photoName: e.target[0].name,
    })
  }

  onChangePhoto(e) {
    this.setState({
      photo: e.target.files[0],
    })
  }
  onChangeUploadedPhoto(e) {
    this.setState({
      uploadedPhoto: e.target.value,
    })
  }

  onSubmit(e) {
    const formData = new FormData()
    formData.append('file', this.state.photo)
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
      this.setState({ uploadedPhoto: fileName, filePath })
    } catch (err) {
      console.log(err)
    }

    const obj = {
      student_name: this.state.student_name,
      student_email: this.state.student_email,
      student_id: this.state.student_id,
      photoName: this.state.photoName,
      photoPath: '',
      googleDrive:this.state.googleDrive,
      address:this.state.address,
      mobile:this.state.mobile,
    }
    // window.alert(obj.student_email)

    axios.post('http://localhost:4000/student/add', obj).then((res) => {
      window.alert(res.data)
    })

    this.setState({
      student_name: '',
      student_email: '',
      student_id: '',
      photoName: '',
      googleDrive:'',
      address:'',
      mobile:'',
    })
  }

  render() {
    return (
      <div>
        <section >
          <div className='container '>
            <div className='row d-flex justify-content-center align-items-center h-100 '>
              <div className='col-lg-12 col-xl-11'>
                <div
                  className='card text-black'
                  style={{ borderRadius: '25px' }}
                >
                  <div className='card-body p-md-5'>
                    <div className='row justify-content-center'>
                      <div className='col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1'>
                        <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>
                          STUDENT REGISTER
                        </p>
                        <form className='mx-1 mx-md-4' onSubmit={this.onSubmit}>
                          <div className='d-flex flex-row align-items-center mb-4'>
                            <i className='fas fa-user fa-lg me-3 fa-fw' />
                            <div className='form-outline flex-fill mb-0'>
                              <input
                                required
                                type='text'
                                id='form3Example1c'
                                className='form-control border-primary border-3'
                                value={this.state.student_name}
                                onChange={this.onChangeStudentName}
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
                                value={this.state.student_email}
                                onChange={this.onChangeStudentEmail}
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
                            <i className='fas fa-envelope fa-lg me-3 fa-fw' />
                            <div className='form-outline flex-fill mb-0'>
                              <input
                                required
                                type='number'
                                id='form3Example3c'
                                className='form-control border-primary border-3'
                                value={this.state.mobile}
                                onChange={this.onChangeMobile}
                              />
                              <label
                                className='form-label'
                                htmlFor='form3Example3c'
                              >
                                TEL No:
                              </label>
                            </div>
                          </div>

                          <div className='d-flex flex-row align-items-center mb-4'>
                            <i className='fas fa-envelope fa-lg me-3 fa-fw' />
                            <div className='form-outline flex-fill mb-0'>
                              <input
                                required
                                type='text'
                                id='form3Example3c'
                                className='form-control border-primary border-3'
                                value={this.state.address}
                                onChange={this.onChangeAddress}
                              />
                              <label
                                className='form-label'
                                htmlFor='form3Example3c'
                              >
                                Address
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
                                value={this.state.student_id}
                                onChange={this.onChangeStudentId}
                              />
                              <label
                                className='form-label'
                                htmlFor='form3Example4c'
                              >
                                Student ID
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
                                value={this.state.googleDrive}
                                onChange={this.onChangeGoogleDrive}
                              />
                              <label
                                className='form-label'
                                htmlFor='form3Example4c'
                              >
                                Drive Link
                              </label>
                            </div>
                          </div>


                          <div className='form-check d-flex justify-content-center mb-5 row'>
                            <input
                              className='custom-file-input border-primary border-3'
                              type='file'
                              accept='.png,.jpg,.jpeg'
                              id='formFileMultiple'
                              onChange={this.onChange1}
                            />
                            <div>
                              <label
                                htmlFor='formFileMultiple'
                                className='form-label'
                              >
                                Upload Photo (please rename the photo from index number)
                              </label>
                            </div>
                          </div>

                          

                          <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                            <button
                              type='submit'
                              className='btn btn-primary btn-lg'
                            >
                              Register
                            </button>
                          </div>
                        </form>
                      </div>

                      <div className='col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2'>
                        <img
                          src='https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png'
                          className='img-fluid'
                          alt=''
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
