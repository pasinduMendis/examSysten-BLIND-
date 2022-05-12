import { useState } from "react"
import axios from "axios"

const CheckID = (props) => {
    const [stid,setStid]=useState('')

    const Submit=(e)=>{
        console.log("Dabare")
        axios
        .get("http://localhost:4000/student/faceRec")
        .then((response) => {
            console.log(response)
            if(response.data != ''){
            props.student(response.data)
            console.log(response.data)
            e.preventDefault()
            }else{
                window.alert('id does not exist')
            }
         
        })
        .catch(function (err) {
          console.log(err);
        });
    }
    return (
        <div>
            <div className='col-lg-12 col-md-12 justify-content-center reg_form mt-5 p-5'>
          <h1 className='text-dark mb-4 mt-3 text-center'>PRESS START</h1>
            <div className='d-flex flex-row align-items-center mb-4'>
              <i className='fas fa-user fa-lg me-3 fa-fw' />
              <div className='form-outline flex-fill mb-0'>

              </div>
            </div>
            <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
              <button
                className='btn btn-success border-warning btn-lg'
                onClick={()=>Submit()}
              >
                START
              </button>
            </div>
        </div>
        </div>
    )
}

export default CheckID
