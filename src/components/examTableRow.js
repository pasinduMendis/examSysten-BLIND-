import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class examTableRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exam_name: this.props.obj.exam_name,
      exam_date: this.props.obj.exam_date,
      exam_id: this.props.obj.instructer_id,
    }
  }

  render() {
    return (
      <tr>
        <td className='text-dark'>{this.state.exam_name}</td>
        <td className='text-dark'>{this.state.exam_date}</td>
        <td>
          <Link
            to={'/addQuestion/' + this.state.exam_name}
            className='btn btn-primary'
          >
            add questions
          </Link>
        </td>
        <td>
          <Link
            to={'/showQuestion/' + this.state.exam_name}
            className='btn btn-primary'
          >
            show mcq
          </Link>
        </td>

        <td>
          <Link
            to={'/showEssay/' + this.state.exam_name}
            className='btn btn-primary'
          >
            show Essay
          </Link>
        </td>

        <td>
          <Link
            to={'/DisplayStudent'}
            className='btn btn-danger'
            onClick={() => {
              axios
                .delete(
                  'http://localhost:4000/exam/delete/' + this.props.obj._id
                )
                .catch((err) => console.log(err))

              this.setState({
                exam_name: this.props.obj.exam_name,
                exam_date: this.props.obj.exam_date,
                exam_id: this.props.obj.instructer_id,
              })
              window.location.reload(true)
            }}
          >
            Delete
          </Link>
        </td>
      </tr>
    )
  }
}
