import React,{Component} from 'react';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';
import './App.css';

const chatClient = new StreamChat('fpgkvdheujjw');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicHJvdWQtbWF0aC0xIn0.VvOMGhdDc8exD6Hbf6Y40wRpp2UDpB3kq7eAnyWOdEY';

chatClient.setUser(
  {
    id: 'proud-math-1',
    name: 'Thomas George',
    image: 'https://getstream.io/random_svg/?id=proud-math-1&name=Proud+math'
  },
  userToken,
);

const filters = { };
const sort = { last_message_at: -1 };
const channels = chatClient.queryChannels(filters, sort);

class App extends React.Component {

  state = {
    coversation: false,
    toggle:false
}

backBtnHandler = () => {
  this.setState({
    coversation: false
  })
}

toggleBtnHandler = () => {
  this.setState({
    toggle:!this.state.toggle
  })
}

onclickHandler = () => {
  this.setState({
    coversation: true
  })
}
  render() {
    return (
      <div className="bot">
        <div
        className= {this.state.toggle ? "chat-wrapper toggle-show" : "chat-wrapper"}>
          <Chat client={chatClient} theme={'messaging light'}>
          {this.state.coversation == false?
            <div className="channel-list-wraper" onClick={this.onclickHandler}>
              <p>Your conversations</p>
              <p className="light-text">The team typically replies in a day.</p>
              <ChannelList channels={channels}/>
            </div> : null
            }
            <Channel>
              <Window>
              {this.state.coversation == false ?
                <div className="welcome-header">
                  <img src="https://downloads.intercomcdn.com/i/o/37840/636907e0fb5448742836e4c5/1bb87d41d15fe27b500a4bfcde01bb0e.png"/>
                  <h2>Hi, We’re Insent.ai 👋</h2>
                  <p>We help your business grow by connecting you to your customers.</p>
                </div> :
                <React.Fragment>
                  <ChannelHeader />
                  <div className="back-btn" onClick = {this.backBtnHandler}>
                    <svg class="intercom-messenger-header-buttons-back-icon">
                      <g fill="none">
                        <g fill="#FFF">
                          <polygon transform="translate(-40 -29)translate(47.071068 36.071068)rotate(-315)translate(-47.071068 -36.071068)" points="44.3 38.8 44.3 31.1 42.1 31.1 42.1 40 42.1 41.1 52.1 41.1 52.1 38.8"></polygon>
                        </g>
                      </g>
                    </svg>
                  </div>
                </React.Fragment>
              }
                {this.state.coversation ?
                  <React.Fragment>
                    <MessageList />
                    <MessageInput />
                  </React.Fragment> :
                  <div className="sample-text-box">
                    <div className="sample-text__wrapper">
                      <p>Product Tour by Insent.ai</p>
                      <p className="light-text">Help customers discover everything they need to know about your product through guided tours that drive adoption.</p>
                    </div>
                  </div>
              }
              </Window>
              <Thread />
            </Channel>
          </Chat>
        </div>
        <div className="toggle-btn" onClick = {this.toggleBtnHandler}>
          {
            this.state.toggle ?
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M19.333 2.547l-1.88-1.88L10 8.12 2.547.667l-1.88 1.88L8.12 10 .667 17.453l1.88 1.88L10 11.88l7.453 7.453 1.88-1.88L11.88 10z" fill-rule="evenodd"></path></svg>
            :
            <svg width="24" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M.011 20L24 10 .011 0 0 7.778 17.143 10 0 12.222z" fill-rule="evenodd"></path></svg>
          }
        </div>
      </div>
    );
  }
}
export default App;