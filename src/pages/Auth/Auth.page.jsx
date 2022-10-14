import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';
import { Navigate } from 'react-router-dom';

import { SessionStoreContext } from '@/store';
import Layout from '@c/Layout';
import { Auth } from '@c/Auth';

import st from './Auth.module.scss';

const AuthPage = observer(() => {
  const sesstionContext = useContext(SessionStoreContext);

  if (sesstionContext.accessToken) {
    return <Navigate to="/" replace={true} />;
  }

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
