import React, { Component } from 'react'

export default class Question extends Component {
  render() {
    return (
        <div className="question">
            <div className="bot-img">
                <img src = "https://s3.amazonaws.com/insent.ai/logo.png"/>
            </div>
            <div className="bot__msg-body">
                <p className="date">1 day ago</p>
                <p className="message">{this.props.text}</p>
            </div>
      </div>  
    )
  }
}
