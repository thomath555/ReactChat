import React, { Component } from 'react'

export default class Reply extends Component {
  render() {
    return (
        <div className="reply">
            <p>{this.props.answer}</p>
        </div> 
    )
  }
}
