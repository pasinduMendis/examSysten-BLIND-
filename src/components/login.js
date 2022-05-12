import { React, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import ForgotPass from './forgotPass'

const Login = () => {
  const [email, setEmail] = useState('')
  const [passw, setPassw] = useState('')
  const [checkPass, setCheckPass] = useState('')
  const [adminId, setAdminId] = useState('')
  const [isAuth, setIsAuth] = useState(true)
  const [urlPage, setUrlPage] = useState('')
  const [trig, setTrig] = useState(true)
  const [forgot,setForgot]=useState(false)

  useEffect(() => {
    axios.get('http://localhost:4000/admin/check2/' + email).then((res) => {
      //setCheckPass(res.data.admin_password)

      //window.alert(res.data.admin_id)
      setUrlPage(`/adminProfile/${res.data.admin_id}`)
      setAdminId(res.data.admin_id)
      //window.alert(adminId)
    })
  }, [email])

  useEffect(() => {
    axios
      .get('http://localhost:4000/admin/check/' + email + '/' + passw)
      .then((res) => {
        //window.alert(res.data)
        setCheckPass(res.data)
      })
  }, [passw])

  const Submit = () => {
    //window.alert(checkPass)

    if (checkPass == 'done') {
      setIsAuth(false)
      setTrig(false)
    } else {
      window.alert('email and password did not match')
    }
  }
  if (!isAuth) {
    return <Redirect to={urlPage} />
  }

  return (<>
    {forgot?<div>
      <ForgotPass close={(val)=>{setForgot(val)}}/>
      </div>:
    

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
                          ADMIN LOGIN
                        </p>
                        <form className='mx-1 mx-md-4' onSubmit={Submit}>
                       
                    
                        <div className='d-flex flex-row align-items-center mb-4 '>
                            <i className='fas fa-envelope fa-lg me-3 fa-fw' />
                            <div className='form-outline flex-fill mb-0 '>
                              <input
                                required
                                type='email'
                                id='form3Example3c'
                                className='form-control border border-primary border-3'
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
                                className='form-control border border-primary border-3'
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
                          <a href="#" className="text-blue" onClick={()=>setForgot(true)}>forgot password?</a>
                            <br/>
                            <br/>
                            
                          <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                            <button
                              type='submit'
                              className='btn btn-primary btn-lg'
                            >
                              Login
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
    
    
}
    </>
  )
}

export default Login
//export const Test = Login.urlPage
