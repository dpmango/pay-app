import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';
import { UiStoreContext } from '@store';

import Stories from '@c/Stories';
import Layout from '@c/Layout';
import Shop, { ShopFilters } from '@c/Shop';

import st from './Home.module.scss';

const HomePage = observer(({ tab }) => {
  // const uiContext = useContext(UiStoreContext);

  return (
    <Layout variant="main">
      <Helmet>
        <title>APP</title>
      </Helmet>

      {tab === 'shops' && <ShopFilters className={st.filters} />}

      <Stories className={st.stories} />
      <Shop className={st.shop} tab={tab} />
    </Layout>
  );
});

export default HomePage;
