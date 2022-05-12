import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import TableRow from "./StudentTableRow";
import Main from "./stProfile";

const DisplayStdunet=(props)=> {

    const[student,setStudent]=useState([]);
    const [studentid,setStudentid]=useState('')
    const[studentResuts,setStudentResult]=useState([])
    const[subject,setSubject]=useState([])
    const[correct,setCorrect]=useState([])
    const[total,setTotal]=useState([])
    const[resultShow,setResultShow]=useState(false)


useEffect(()=>{
  axios
    .get("http://localhost:4000/student")
    .then((response) => {
      setStudent(response.data);
    })
    .catch(function (err) {
      console.log(err);
    });
}) 

useEffect(()=>{
  getResut(studentid)
},[studentid])

const result=(a)=>{
  for(var i=0;i<a.length;i++){
      return <>
      <h3 className='text-black px-5'>subject : {subject[i]}</h3>
      <h3 className='text-black px-5 mb-4'>results : {studentResuts[i]*100+'%'} </h3>
      <h3 className='text-black px-5 mb-4'>Correct : {correct[i]} </h3>
      <h3 className='text-black px-5 mb-4'>Total : {total[i]} </h3>
      </>
  }
}
const getResut=(s)=>{
  axios.get('http://localhost:4000/result/get/'+s).then((res)=>{
    //console.log(res.data[0].subject)
    res.data && res.data.length>0?
    res.data.map((item)=>{
        var resu=studentResuts
        var sub=subject
        var cor=correct
        var tot=total
        resu.push(item.marks)
        sub.push(item.subject)
        cor.push(item.correct)
        tot.push(item.total)
          setStudentResult(resu)
          setSubject(sub)
          setCorrect(cor)
          setTotal(tot)
        setResultShow(true)
    }):window.alert('currently no results in Database')
  })
}

  const tabRow=()=> {
    return student.map(function (object, i) {
      return <TableRow obj={object} key={i} stId={(id)=>setStudentid(id)} />;
    });
  }


    return (
      <>
      {resultShow?<>
        {result(studentResuts)}
      </>
      :
      <div className="container border-primary border-3">
        <h2 className="text-warning fw-bold" align="center">
          STUDENT LIST
        </h2>
        <table className="table table-striped mt-5 border-primary border-3">
          <thead>
            <tr>
              <th className="text-dark">Name</th>
              <th className="text-dark">Email</th>
              <th className="text-dark">ID</th>
            </tr>
          </thead>
          <tbody>{tabRow()}</tbody>
        </table>
      </div>
}
      </>
    );
  
}
export default DisplayStdunet