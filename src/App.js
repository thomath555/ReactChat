import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import './App.css';
import Question from './Question';
import Reply from './Reply';
import QusButton from './QusButton';
const pusher = new Pusher('c8cba20ff21ea1f6857f', {
  cluster: 'ap2',
  authEndpoint: "https://dev-be.insent.ai/pusher/auth"
});

let channel;

class App extends React.Component {

  state = {
    coversation: true,
    toggle: false,
    apiData: {},
    questions: [],
    currentQuestion: 0,
    conversationArray: [],
    pusherData: {}
  }

  componentDidMount() {
    axios.get(
      'https://dev-be.insent.ai/getuser?url=https://thomas-dev.herokuapp.com',
      { 'headers': { 'Authorization': 'Bearer jHeXdnR4k2Lvs9rZmfwU' } }).then(data => {
        const { pusherData } = this.state;
        pusherData.channelId = data.data.channelId;
        this.setState({
          pusherData,
        });
        channel = pusher.subscribe(data.data.channelId);
        channel.bind('pusher:subscription_succeeded', data => {
        });
        channel.bind('pusher:subscription_error', data => {
        });
        channel.bind('server-message', data => {
          const { questions } = this.state;
          if(data.messages) {
            this.setState({
              questions: questions.concat(data.messages),
            }, () => {
              console.log('>>>>', this.state.questions)
              this.setNextQuestion();
            });
          }
        });
        this.setState({
          apiData: data.data,
          questions: data.data && data.data.messages ? data.data.messages : [],
          conversationArray: [data.data.messages[0]],
        });
        if (data.data.messages[0].text) {
          setTimeout(() => {
            this.setNextQuestion();
          }, data.data.messages[0].pause);
        }
      });
  }

  buttonOnClickHandler = (data) => {
    const { conversationArray, pusherData } = this.state;
    pusherData.message = {
      'user-intention':[data],
    }
    this.setState({pusherData});
    const triggered = channel.trigger('client-message', pusherData);
    conversationArray.push({
      answer: data
    });
    this.setState({
      conversationArray
    })
  }

  handleTextChange = (e) => {
    if (e.keyCode === 13) {
      const payload = {
        username: this.state.username,
        message: this.state.text
      };
      axios.post('https://staging-be.insent.ai?publisher_key=jHeXdnR4k2Lvs9rZmfwU', payload);
    } else {
      this.setState({ text: e.target.value });
    }
  }

  setNextQuestion = () => {
    const { conversationArray, currentQuestion, questions } = this.state;
    conversationArray.push(questions[currentQuestion + 1]);
    this.setState({
      conversationArray,
      currentQuestion: currentQuestion + 1,
    }, () => {
      if (questions[currentQuestion + 1].text) {
        setTimeout(() => {
          this.setNextQuestion();
        }, questions[currentQuestion + 1].pause)
      }
    });

  }

  toggleBtnHandler = () => {
    this.setState ({
      toggle: !this.state.toggle
    })
  }

  render() {
    const { conversationArray } = this.state;
    return (
      <div className="bot">
        <div
        className= {this.state.toggle ? "bot-wrapper" : "bot-wrapper toggle-show"}>
          <div className="bot__header">
            <p>Insent</p>
          </div>
          <div className="bot__body">
            {
              conversationArray.map((el) => (
                el.text ? (
                  <Question text={el.text} />
                ) : el.buttons ? (
                  <QusButton onClickHandler={this.buttonOnClickHandler} buttons={el.buttons.fields} />
                ) : el.answer ? (
                  <Reply answer={el.answer} />
                ) : null
              ))
            }
          </div>
          <div className="footer">
            <img src="https://s3.amazonaws.com/insent.ai/logo.png" /> 
            <p className="date">Powered by Insent AI</p>
          </div>
        </div>
       

        <div className="toggle-btn" onClick={this.toggleBtnHandler}>
          {
            !this.state.toggle ?
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M19.333 2.547l-1.88-1.88L10 8.12 2.547.667l-1.88 1.88L8.12 10 .667 17.453l1.88 1.88L10 11.88l7.453 7.453 1.88-1.88L11.88 10z" fillRule="evenodd"></path></svg>
              :
              <svg width="24" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M.011 20L24 10 .011 0 0 7.778 17.143 10 0 12.222z" fillRule="evenodd"></path></svg>
          }
        </div>
      </div>
    );
  }
}
export default App;