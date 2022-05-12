import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Exams from './showexams'
import CheckID from './checkID'

const Index = (props) => {
  const [exam, setExam] = useState([])
  const [examEssay, setExamEssay] = useState([])
  const [audio, setAudio] = useState('')
  const [prevAudio, setPrevAudio] = useState('')
  const [transcriptText, setTranscript] = useState('')
  const [questionNum, setQuestionNum] = useState(0)
  const [questionNumEssay, setQuestionNumEssay] = useState(0)
  const [subject,setSubject]=useState('')
  const [answers,setAnswers]=useState([])
  const [results,setResults]=useState([])
  const [over,setOver]=useState(false)
  const [time,setTime]=useState([])
  const [skipMcq,setSkipMcq]=useState([])
  const [skipMcqNo,setSkipMcqNo]=useState(0)
  const [qType,setQtype]=useState(0)
  const [remainingTime,setRemainingTime]=useState(0)
  const [warn,setWarn]=useState(false)
  const[student,setStudent]=useState('')
  

  useEffect(() => {
    subject?axios.get('http://localhost:4000/question/check/mcq/'+subject).then((res) => {
      setExam(res.data)
      console.log(res.data)
    }) :setSubject('')

    subject?axios.get('http://localhost:4000/question/check/essay/'+subject).then((res) => {
      setExamEssay(res.data)
      console.log(res.data)
    }) :setSubject('')
    
    //console.log(time)
  }, [subject])

   const clacTime=()=>{
     console.log('abc')
     console.log(time)
    var date=new Date()
    var year=date.getFullYear();
    var month=date.getMonth();
    var day=date.getDate()
    var hours=date.getHours();
    var min=date.getMinutes();
    var date2=new Date(year,month,day,time[0],time[1])
    console.log(time[0],time[1])
    var rema=(date2.getHours()-date.getHours())*60+(date2.getMinutes()-date.getMinutes())
    setRemainingTime(rema)
    console.log((date2.getHours()-date.getHours())*60+(date2.getMinutes()-date.getMinutes()))
    if(rema==-10 ||rema==5 || rema==-15 ||rema==20){
      setWarn(true)
    }
    else if(rema<=0){
      recognition.stop()
          //addResults()
          setOver(true)
          if(qType==0||qType==1){
            addResults()
          }
    }
    else{
      setWarn(false)
    }
  } 

useEffect(()=>{
  const intervalId=setInterval(()=>{
    clacTime()
  },60000)
 return ()=>clearInterval(intervalId)
},[subject])

  var Speech = window.webkitSpeechRecognition
  var recognition = new Speech()
  recognition.continuous = true

  const clickBtn = () => {
    recognition.start()
  }
  recognition.onspeechend = function () {}
  recognition.onspeechend = function () {}
  recognition.onspeechend = function () {}
  recognition.onresult = function (e) {
    var current = e.resultIndex
    var transcript = e.results[current][0].transcript
    //console.log(transcript)
    setTranscript(transcript.split(' ').join(''))
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async() => {
      if(exam != 'unavailable'){
        console.log(examEssay)
        if(qType==0){
      console.log( transcriptText)
      console.log('QNum: '+questionNum)
      if (transcriptText === 'start') {
        setQuestionNum(0)
      } 
      else if (transcriptText === 'again') {
        await setTimeout(setAudio(), 1000)
       // setAudio('')
        setAudio(prevAudio)
      }
      else if (transcriptText === 'question'||transcriptText === 'q') {        
        await setTimeout(setAudio(), 1000)
        //console.log('done')
        setAudio(exam[questionNum].question)
        setPrevAudio(exam[questionNum].question)
      }
      else if (transcriptText === 'one'||transcriptText === '1') {        
        await setTimeout(setAudio(), 1000)
        //console.log('done')
        setAudio(exam[questionNum].answerA)
        setPrevAudio(exam[questionNum].answerA)
      }
      else if (transcriptText === 'two'||transcriptText === '2'||transcriptText === 'tu'||transcriptText === 'Tu') {        
        await setTimeout(setAudio(), 1000)
        //console.log('done')
        setAudio(exam[questionNum].answerB)
        setPrevAudio(exam[questionNum].answerB)
      }
      else if (transcriptText === 'three'||transcriptText === '3') {        
        await setTimeout(setAudio(), 1000)
        //console.log('done')
        setAudio(exam[questionNum].answerC)
        setPrevAudio(exam[questionNum].answerC)
      }
      else if (transcriptText === 'four'||transcriptText === '4'||transcriptText === 'for') {        
        await setTimeout(setAudio(), 1000)
        //console.log('done')
        setAudio(exam[questionNum].answerD)
        setPrevAudio(exam[questionNum].answerD)
      }
      else if (transcriptText === 'skip') {  
        if((questionNum+2) <= exam.length){      
        await setTimeout(setAudio(), 1000)
        var skipQ=skipMcq
        skipQ.push(questionNum)
        setSkipMcq(skipQ)
        var num=questionNum+1
        console.log(num)
        await setTimeout(setQuestionNum(num),1000)

        await setTimeout(setAudio(), 1000)
        //console.log('done')
        setAudio(exam[num].question)
        setPrevAudio(exam[num].question)
      }
      else{
        var skipQ=skipMcq
        skipQ.push(questionNum)
        setSkipMcq(skipQ)
        setQtype(1)
        /* console.log('all questions are over')
        recognition.stop()
        addResults()
        setOver(true) */
      }
      }
      else if (transcriptText === 'stop') {        
        await setTimeout(setAudio(), 1000)
      }
      else if (transcriptText === 'final A'||transcriptText === 'finalA'||transcriptText === 'finala') {        
        await setTimeout(setAudio(), 1000)
        answers.push(`${questionNum+1} . A`)
        if(exam[questionNum].correct_answer=='A'||exam[questionNum].correct_answer=='a'){
          results.push(`${questionNum+1} . correct`)
        }
        if((questionNum+2) <= exam.length){      
          await setTimeout(setAudio(), 1000)
          var num=questionNum+1
          console.log(num)
          await setTimeout(setQuestionNum(num),1000)
  
          await setTimeout(setAudio(), 1000)
          //console.log('done')
          setAudio(exam[num].question)
          setPrevAudio(exam[num].question)
        }
        else{
          setQtype(1)
          /* console.log('all questions are over')
          recognition.stop()
          addResults()
          setOver(true) */
        }
      }
      else if (transcriptText === 'final B'||transcriptText === 'finalB'||transcriptText === 'finalb') {        
        await setTimeout(setAudio(), 1000)
        answers.push(`${questionNum+1} . B`)
        if(exam[questionNum].correct_answer=='B'||exam[questionNum].correct_answer=='b'){
          results.push(`${questionNum+1} . correct`)
        }
        if((questionNum+2) <= exam.length){      
          await setTimeout(setAudio(), 1000)
          var num=questionNum+1
          console.log(num)
          await setTimeout(setQuestionNum(num),1000)
  
          await setTimeout(setAudio(), 1000)
          //console.log('done')
          setAudio(exam[num].question)
          setPrevAudio(exam[num].question)
        }
        else{
          setQtype(1)
          /* console.log('all questions are over')
          recognition.stop()
          addResults()
          setOver(true) */
        }
      }
      else if (transcriptText === 'final C'||transcriptText === 'finalC'||transcriptText === 'finalc'||transcriptText === 'finalSi') {        
        await setTimeout(setAudio(), 1000)
        answers.push(`${questionNum+1} . C`)
        if(exam[questionNum].correct_answer=='C'||exam[questionNum].correct_answer=='c'){
          results.push(`${questionNum+1} . correct`)
        }
        if((questionNum+2) <= exam.length){      
          await setTimeout(setAudio(), 1000)
          var num=questionNum+1
          console.log(num)
          await setTimeout(setQuestionNum(num),1000)
  
          await setTimeout(setAudio(), 1000)
          //console.log('done')
          setAudio(exam[num].question)
          setPrevAudio(exam[num].question)
        }
        else{
          setQtype(1)
          /* console.log('all questions are over')
          recognition.stop()
          addResults()
          setOver(true) */
        }
      }
      else if (transcriptText === 'final D'||transcriptText === 'finalD'||transcriptText === 'finald'||transcriptText === 'finalDe') {        
        await setTimeout(setAudio(), 1000)
        answers.push(`${questionNum+1} . D`)
        if(exam[questionNum].correct_answer=='D'||exam[questionNum].correct_answer=='d'){
          results.push(`${questionNum+1} . correct`)
        }
        if((questionNum+2) <= exam.length){      
          await setTimeout(setAudio(), 1000)
          var num=questionNum+1
          console.log(num)
          await setTimeout(setQuestionNum(num),1000)
  
          await setTimeout(setAudio(), 1000)
          //console.log('done')
          setAudio(exam[num].question)
          setPrevAudio(exam[num].question)
        }
        else{
          setQtype(1)
          /* console.log('all questions are over')
          recognition.stop()
          addResults()
          setOver(true) */
        }
      }
      else{
        await setTimeout(setAudio(), 2000)
        //console.log('done')
        setAudio('tryAgain.mp3')
      }
    }else if(qType==1){
      if(skipMcq.length==0){
        setQtype(2)
      }
      else{
      console.log( transcriptText)
      console.log('QNum: '+skipMcq[skipMcqNo])
       if (transcriptText === 'again') {
        await setTimeout(setAudio(), 1000)
       // setAudio('')
        setAudio(prevAudio)
      }
      else if (transcriptText === 'question'||transcriptText === 'q') {        
        await setTimeout(setAudio(), 1000)
        //console.log('done')
        setAudio(exam[skipMcq[skipMcqNo]].question)
        setPrevAudio(exam[skipMcq[skipMcqNo]].question)
      }
      else if (transcriptText === 'one'||transcriptText === '1') {        
        await setTimeout(setAudio(), 1000)
        //console.log('done')
        setAudio(exam[skipMcq[skipMcqNo]].answerA)
        setPrevAudio(exam[skipMcq[skipMcqNo]].answerA)
      }
      else if (transcriptText === 'two'||transcriptText === '2'||transcriptText === 'tu'||transcriptText === 'Tu') {        
        await setTimeout(setAudio(), 1000)
        //console.log('done')
        setAudio(exam[skipMcq[skipMcqNo]].answerB)
        setPrevAudio(exam[skipMcq[skipMcqNo]].answerB)
      }
      else if (transcriptText === 'three'||transcriptText === '3') {        
        await setTimeout(setAudio(), 1000)
        //console.log('done')
        setAudio(exam[skipMcq[skipMcqNo]].answerC)
        setPrevAudio(exam[skipMcq[skipMcqNo]].answerC)
      }
      else if (transcriptText === 'four'||transcriptText === '4'||transcriptText === 'for') {        
        await setTimeout(setAudio(), 1000)
        //console.log('done')
        setAudio(exam[skipMcq[skipMcqNo]].answerD)
        setPrevAudio(exam[skipMcq[skipMcqNo]].answerD)
      }
      else if (transcriptText === 'next') {  
        if((skipMcqNo+2) <= skipMcq.length){      
        await setTimeout(setAudio(), 1000)
        var num=skipMcqNo+1
        console.log(num)
        await setTimeout(()=>{setQuestionNum(skipMcq[num]);setSkipMcqNo(num)},1000)

        await setTimeout(setAudio(), 1000)
        //console.log('done')
        setAudio(exam[skipMcq[num]].question)
        setPrevAudio(exam[skipMcq[num]].question)
      }
      else{
        setQtype(2)
        addResults()
      /*   console.log('all questions are over')
        recognition.stop()
        addResults()
        setOver(true) */
      }
      }
      else if (transcriptText === 'stop') {        
        await setTimeout(setAudio(), 1000)
      }
      else if (transcriptText === 'final A'||transcriptText === 'finalA'||transcriptText === 'finala') {        
        await setTimeout(setAudio(), 1000)
        answers.push(`${skipMcq[skipMcqNo]+1} . A`)
        if(exam[skipMcq[skipMcqNo]].correct_answer=='A'||exam[skipMcq[skipMcqNo]].correct_answer=='a'){
          results.push(`${skipMcq[skipMcqNo]+1} . correct`)
        }
        if((skipMcqNo+2) <= skipMcq.length){      
          await setTimeout(setAudio(), 1000)
          var num=skipMcqNo+1
          console.log(num)
          await setTimeout(()=>{setQuestionNum(skipMcq[num]);setSkipMcqNo(num)},1000)
  
          await setTimeout(setAudio(), 1000)
          //console.log('done')
          setAudio(exam[num].question)
          setPrevAudio(exam[num].question)
        }
        else{
          addResults()
          setQtype(2)
 /*           console.log('all questions are over')
          recognition.stop()
          addResults()
          setOver(true) */
        }
      }
      else if (transcriptText === 'final B'||transcriptText === 'finalB'||transcriptText === 'finalb') {        
        await setTimeout(setAudio(), 1000)
        answers.push(`${skipMcq[skipMcqNo]+1} . B`)
        if(exam[skipMcq[skipMcqNo]].correct_answer=='B'||exam[skipMcq[skipMcqNo]].correct_answer=='b'){
          results.push(`${skipMcq[skipMcqNo]+1} . correct`)
        }
        if((skipMcqNo+2) <= skipMcq.length){      
          await setTimeout(setAudio(), 1000)
          var num=skipMcqNo+1
          console.log(num)
          await setTimeout(()=>{setQuestionNum(skipMcq[num]);setSkipMcqNo(num)},1000)
  
          await setTimeout(setAudio(), 1000)
          //console.log('done')
          setAudio(exam[num].question)
          setPrevAudio(exam[num].question)
        }
        else{
          setQtype(2)
          addResults()
          /* console.log('all questions are over')
          recognition.stop()
          addResults()
          setOver(true) */
        }
      }
      else if (transcriptText === 'final C'||transcriptText === 'finalC'||transcriptText === 'finalc'||transcriptText === 'finalSi') {        
        await setTimeout(setAudio(), 1000)
        answers.push(`${skipMcq[skipMcqNo]+1} . C`)
        if(exam[skipMcq[skipMcqNo]].correct_answer=='C'||exam[skipMcq[skipMcqNo]].correct_answer=='c'){
          results.push(`${skipMcq[skipMcqNo]+1} . correct`)
        }
        if((skipMcqNo+2) <= skipMcq.length){      
          await setTimeout(setAudio(), 1000)
          var num=skipMcqNo+1
          console.log(num)
          await setTimeout(()=>{setQuestionNum(skipMcq[num]);setSkipMcqNo(num)},1000)
  
          await setTimeout(setAudio(), 1000)
          //console.log('done')
          setAudio(exam[num].question)
          setPrevAudio(exam[num].question)
        }
        else{
          addResults()
          setQtype(2)
          /* console.log('all questions are over')
          recognition.stop()
          addResults()
          setOver(true) */
        }
      }
      else if (transcriptText === 'final D'||transcriptText === 'finalD'||transcriptText === 'finald'||transcriptText === 'finalDe') {        
        await setTimeout(setAudio(), 1000)
        answers.push(`${skipMcq[skipMcqNo]+1} . D`)
        if(exam[skipMcq[skipMcqNo]].correct_answer=='D'||exam[skipMcq[skipMcqNo]].correct_answer=='d'){
          results.push(`${skipMcq[skipMcqNo]+1} . correct`)
        }
        if((skipMcqNo+2) <= skipMcq.length){      
          await setTimeout(setAudio(), 1000)
          var num=skipMcqNo+1
          console.log(num)
          await setTimeout(()=>{setQuestionNum(skipMcq[num]);setSkipMcqNo(num)},1000)
  
          await setTimeout(setAudio(), 1000)
          //console.log('done')
          setAudio(exam[num].question)
          setPrevAudio(exam[num].question)
        }
        else{
          addResults()
          setQtype(2)
          /* console.log('all questions are over')
          recognition.stop()
          addResults()
          setOver(true) */
        }
      }
      else{
        await setTimeout(setAudio(), 2000)
        //console.log('done')
        setAudio('tryAgain.mp3')
      }
    }

    }else if(qType==2){
      if(examEssay.length==0){
        console.log('all questions are over')
        recognition.stop()
        //addResults()
        setOver(true)
      }else{
      console.log( transcriptText)
      console.log('QNum: '+questionNumEssay)
      if (transcriptText === 'start') {
        setQuestionNumEssay(0)
      } 
      else if (transcriptText === 'again') {
        await setTimeout(setAudio(), 1000)
       // setAudio('')
        setAudio(prevAudio)
      }
      else if (transcriptText === 'question'||transcriptText === 'q') {        
        await setTimeout(setAudio(), 1000)
        //console.log('done')
        setAudio(examEssay[questionNumEssay].question)
        setPrevAudio(examEssay[questionNumEssay].question)
      }
      else if (transcriptText === 'next'||transcriptText === 'Next') {        
        if((questionNumEssay+2) <= examEssay.length){      
          await setTimeout(setAudio(), 1000)
          var num=questionNumEssay+1
          console.log(num)
          await setTimeout(()=>{setQuestionNumEssay(num)},1000)
  
          await setTimeout(setAudio(), 1000)
          //console.log('done')
          setAudio(examEssay[num].question)
          setPrevAudio(examEssay[num].question)
        }
        else{
          console.log('all questions are over')
          recognition.stop()
          //addResults()
          setOver(true)
        }
      }
      else{
        await setTimeout(setAudio(), 2000)
        //console.log('done')
        setAudio('tryAgain.mp3')
      }
    }
  }
    }    else{
      window.alert('no question added')
    } 
    }, [transcriptText])

    
console.log(audio)
  const play = () => {
    return (
      <audio controls autoPlay>
        <source
          src={'http://localhost:4000/Auploads\\' + audio}
          type='audio/mpeg'
        />
      </audio>
    )
  }

  const playWarn=()=>{
    return(
      <audio controls autoPlay>
      <source
        src={'http://localhost:4000/Auploads\\Bell.mp3'}
        type='audio/mpeg'
      />
    </audio>
    )
   
  }

  const addResults=()=>{
    const obj = {
      student_id: student,
      givenAnswers: answers,
      marks: exam.length?(results.length)/(exam.length):0,
      subject:subject,
      total:exam.length?(exam.length):0,
      correct:exam.length?(results.length):0,
    }

    axios.post('http://localhost:4000/result/add', obj).then((res) => {
      //window.alert(res.data)
    })
  }
  //console.log(object)
  return (

    <>
        {student==''?
        <CheckID student={(id)=>{setStudent(id)}}/>:
    <div className='row d-flex justify-content-around bg-white'>
      
     {over?<>
     <h1 className='mt-5 text-center'>ANSWERS</h1>
      {answers && answers.map((x)=>{
        return <h2 className='mt-1 text-center'>{x}</h2>
      })}

    <h1 className='mt-5 text-center'>CORRECT ANSWERS</h1>
      {results && results.map((x)=>{
        return <h2 className='mt-1 text-center'>{x}</h2>
      })}
      <h1 className='mt-5 text-center text-danger'>Marks: {exam.length?(results.length)/(exam.length):0}</h1>
      </>:
      <>
      {subject?<div className='col-8 p-5 pt-2 bg-dark text-light my-3 text-center'>
        <h1 className='text-center text-light mt-3 mb-3'>Online Exam</h1>
        <div className='form-group d-flex justify-content-around'><h2>{audio?play():'no render Items'}</h2></div>
        <div className='form-group d-flex justify-content-around'><h2>{warn?playWarn():""}</h2></div>
        <button
          onClick={() => {
            clickBtn()
          }}
          id='star-btn'
          className='btn btn-danger btn-lg sm:btn-sm mt-5 border-2 border-light'
        >
          start
        </button>
        <h1 className='text-center text-light'> Transcript Text : {transcriptText}</h1>
        <h1 className='text-center text-light' >{remainingTime} Minutes</h1>
        <h1 className='text-center text-warning'>SKIP QUESTIONS</h1>
        {skipMcq.length>0?
        skipMcq.map((id)=>{return <h1 className='text-center text-warning'>{id}</h1>})
        :<h1>no skip questions</h1>}
      </div>
      :
      <div className='col-8'>
      <Exams subject={(sub)=>setSubject(sub)} time={(t)=>setTime(t)}/>
      </div>
      }
      </>
      }
      
    </div>
}
    </>

  )
}

export default Index
