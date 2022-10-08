import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import Layout from '@c/Layout';
import { ProfileSettings } from '@c/Profile';

// import st from './Profile.module.scss';

const ProfileSettingsPage = observer(() => {
  // const uiContext = useContext(UiStoreContext);

  return (
    <Layout variant="main">
      <Helmet>
        <title>Profile Settings</title>
      </Helmet>

      <ProfileSettings />
    </Layout>
  );
});

export default ProfileSettingsPage;
