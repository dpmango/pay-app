import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import Layout from '@c/Layout';
import { Chat } from '@c/Chat';

// import st from './Profile.module.scss';

const ChatPage = observer(() => {
  // const uiContext = useContext(UiStoreContext);

  return (
    <Layout variant="main">
      <Helmet>
        <title>Chat</title>
      </Helmet>

      <Chat />
    </Layout>
  );
});

export default ChatPage;
