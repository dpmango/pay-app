import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import Layout from '@c/Layout';
import { Auth } from '@c/Auth';

import st from './Auth.module.scss';

const AuthPage = observer(() => {
  // const uiContext = useContext(UiStoreContext);

  return (
    <Layout variant="clear">
      <Helmet>
        <title>Auth</title>
      </Helmet>

      <Auth className={st.auth} />
    </Layout>
  );
});

export default AuthPage;
