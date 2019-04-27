import React from 'react';
import { Chat, Channel, ChannelHeader, Thread, Window } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import './App.css';

import 'stream-chat-react/dist/css/index.css';

const chatClient = new StreamChat('fpgkvdheujjw');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiam9sbHktYm9udXMtMyJ9.XoZ7Pkzit4GnKgYM1HI8T8ewxwqHQaDiJrnV9DT2EFg';

chatClient.setUser(
  {
       id: 'jolly-bonus-3',
       name: 'Thomas George',
       image: 'https://content.thriveglobal.com/wp-content/uploads/2018/12/profile21.jpg'
  },
  userToken,
);

const channel = chatClient.channel('messaging', 'godevs', {
  // add as many custom fields as you'd like
  image: 'https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png',
  name: 'Talk about Go',
});

const App = () => (
  <div className="wrapper">
    <Chat client={chatClient} theme={'messaging light'}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  </div>
);

export default App;