import React, { Component } from 'react'
import axios from 'axios'
import TableRow from './examTableRow'
import Main from './stProfile'

export default class showExams extends Component {
  constructor(props) {
    super(props)
    this.state = { exam: [] }
  }

  componentDidMount() {
    axios
      .get('http://localhost:4000/exam/')
      .then((response) => {
        this.setState({ exam: response.data })
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  tabRow() {
    return this.state.exam.map(function (object, i) {
      return <TableRow obj={object} key={i} />
    })
  }

  render() {
    return (
      <div className='container'>
        <h2 className='text-warning fw-bold' align='center'>
          EXAM LIST
        </h2>
        <table className='table table-striped mt-5 border-primary border-3'>
          <thead>
            <tr>
              <th className='text-dark '>Exam Name</th>
              <th className='text-dark'>Exam Date</th>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    )
  }
}
