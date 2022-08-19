import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import { ProfileInfo, ProfileActions } from '@c/Profile';

import st from './Profile.module.scss';

const ProfilePage = observer(() => {
  // const uiContext = useContext(UiStoreContext);

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <ProfileInfo className={st.info} />
      <ProfileActions className={st.actions} />
    </>
  );
});

export default ProfilePage;
