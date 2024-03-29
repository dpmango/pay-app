import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import Layout from '@c/Layout';
import { ProfileInfo, ProfileActions } from '@c/Profile';
import { ModalMethodSelect } from '@c/Modal';

import st from './Profile.module.scss';

const ProfilePage = observer(() => {
  // const uiContext = useContext(UiStoreContext);

  return (
    <Layout variant="main">
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <ProfileInfo className={st.info} />
      <ProfileActions className={st.actions} />

      <ModalMethodSelect connectOnly={true} />
    </Layout>
  );
});

export default ProfilePage;
