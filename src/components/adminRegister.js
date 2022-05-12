
import { React, useState } from 'react'
import axios from 'axios'
import emailjs from 'emailjs-com'
import { useHistory } from 'react-router'
import 'antd/dist/antd.css';
import { Alert } from 'antd';
//import emailjs from 'emailjs-com'

const Register = () => {
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [passw, setPassw] = useState('')
  const [passwConf, setPasswConf] = useState('')
  const [confirm, setConfirm] = useState(true)
  const [veriCode, setVeriCode] = useState('')
  const [code, setCode] = useState('code')
  const [alert, setAlert] = useState('')
  const history = useHistory()
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length

  const onClose = (e) => {
    setAlert('');
  };
  const verification = (a) => {
    if (!a) {
      return (
        <div className='col-lg-12 col-md-12 justify-content-center reg_form mt-5 p-5'>
          <h1 className='text-dark mb-4 mt-3 text-center'>ADMIN REGISTER</h1>
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
                <p className='text-dark'>
                  your verification code was sent to {email}
                </p>
                <input
                  required
                  type='text'
                  id='form3Example1c'
                  className='form-control border-primary border-3'
                  value={veriCode}
                  onChange={(e) => setVeriCode(e.target.value)}
                />
                <label
                  className='form-label text-light'
                  htmlFor='form3Example1c'
                >
                  verification code
                </label>
              </div>
            </div>
            <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
              <button
                type='submit'
                className='btn btn-success border-warning btn-lg'
              >
                Register
              </button>
            </div>
          </form>
        </div>
      )
    } else {
      return (
        <div className='  mb-5'>
        <section >
          <div className='container '>
            <div className='row d-flex justify-content-center align-items-center h-100'>
              <div className='col-lg-12 col-xl-11'>
                <div
                  className='card text-black'
                  style={{ borderRadius: '25px' }}
                >
                  <div className='card-body p-md-5'>
                    <div className='row justify-content-center'>
                      <div className='col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1'>
                        <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>
                          ADMIN REGISTER
                        </p>
                        <form className='mx-1 mx-md-4' onSubmit={Submit}>
                          <div className='d-flex flex-row align-items-center mb-4'>
                            <i className='fas fa-user fa-lg me-3 fa-fw' />
                            <div className='form-outline flex-fill mb-0'>
                              <input
                                required
                                type='text'
                                id='form3Example1c'
                                className='form-control border-primary border-3'
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                              />
                              <label
                                className='form-label'
                                htmlFor='form3Example1c'
                              >
                                Your Name
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
                                value={id}
                                onChange={(e)=>setId(e.target.value)}
                              />
                              <label
                                className='form-label'
                                htmlFor='form3Example1c'
                              >
                                Your Teacher ID
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
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                              />
                              <label
                                className='form-label'
                                htmlFor='form3Example3c'
                              >
                                Your Email
                              </label>
                            </div>
                          </div>
                          <div className='d-flex flex-row align-items-center mb-4'>
                            <i className='fas fa-lock fa-lg me-3 fa-fw' />
                            <div className='form-outline flex-fill mb-0'>
                              <input
                                required
                                type='password'
                                id='form3Example4c'
                                className='form-control border-primary border-3'
                                value={passw}
                                onChange={(e)=>setPassw(e.target.value)}
                              />
                              <label
                                className='form-label'
                                htmlFor='form3Example4c'
                              >
                                Password
                              </label>
                            </div>
                          </div>
                          <div className='d-flex flex-row align-items-center mb-4'>
                            <i className='fas fa-key fa-lg me-3 fa-fw' />
                            <div className='form-outline flex-fill mb-0'>
                              <input
                                type='password'
                                id='form3Example4cd'
                                className='form-control border-primary border-3'
                                value={passwConf}
                                onChange={(e)=>setPasswConf(e.target.value)}
                              />
                              <label
                                className='form-label'
                                htmlFor='form3Example4cd'
                              >
                                Confirm your password
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
  const Submit = (e) => {
    if (passw === passwConf) {
      if (confirm) {
        for (var i = 0; i < 8; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          )
        }
        setCode(result)
        const templateParams = {
          email: email,
          code: result,
        }

        emailjs
          .send(
            'service_t9tz3zr',
            'template_cgcgwij',
            templateParams,
            'user_EYHVnaQtcrGutYd2o0WDc'
          )
          .then(
            (response) => {
              console.log('SUCCESS!', response.status, response.text)
            },
            (err) => {
              console.log('FAILED...', err)
            }
          )
      }
      setConfirm(false)

      //window.alert(code)
      if (code === veriCode) {
        const obj = {
            admin_name: name,
            admin_email:email,
            admin_password: passw,
            admin_id: id,
          //admin_id: this.state.admin_id,
        }

        axios.post('http://localhost:4000/admin/add', obj).then((res) => {
          setAlert(res.data)
          setName('')
          setEmail('')
          setId('')
          setPassw('')
          setPasswConf('')
        })
        //setConfirm(true)
        history.push('/login')
      } else {
        window.alert('please enter correct verification code')
        e.preventDefault()
      }
    } else {
      window.alert('confirm password did not match')
      e.preventDefault()
    }
  }

  return (
    <div>  
          {verification(confirm)}
        </div>


  )
}

export default Register
