import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';
import { UiStoreContext } from '@store';

import Stories from '@c/Stories';
import Shop from '@c/Shop';

import st from './Home.module.scss';

const HomePage = observer(({ tab }) => {
  // const uiContext = useContext(UiStoreContext);

  return (
    <>
      <Helmet>
        <title>APP</title>
      </Helmet>

      <Stories className={st.stories} />
      <Shop className={st.shop} tab={tab} />
    </>
  );
});

export default HomePage;
