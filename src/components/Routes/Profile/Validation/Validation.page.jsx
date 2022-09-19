import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import Layout from '@c/Layout';
import { ProfileValidation } from '@c/Profile';

import st from './Validation.module.scss';

const ProfileValidationPage = observer(() => {
  // const uiContext = useContext(UiStoreContext);

  return (
    <Layout variant="clear">
      <Helmet>
        <title>Profile validation</title>
      </Helmet>

      <ProfileValidation className={st.validation} />
    </Layout>
  );
});

export default ProfileValidationPage;
