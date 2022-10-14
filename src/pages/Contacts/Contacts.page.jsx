import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import Layout from '@c/Layout';
import Contacts from '@c/Contacts';

import st from './Profile.module.scss';

const ContactsPage = observer(() => {
  // const uiContext = useContext(UiStoreContext);

  return (
    <Layout variant="main">
      <Helmet>
        <title>Contacts</title>
      </Helmet>

      <Contacts className={st.contacts} />
    </Layout>
  );
});

export default ContactsPage;
