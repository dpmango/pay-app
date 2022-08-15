import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import Contacts from '@c/Contacts';

import st from './Profile.module.scss';

const ContactsPage = observer(() => {
  // const uiContext = useContext(UiStoreContext);

  return (
    <>
      <Helmet>
        <title>Contacts</title>
      </Helmet>

      <Contacts className={st.contacts} />
    </>
  );
});

export default ContactsPage;
