import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';
import { UiStoreContext } from '@store';

import { EventSignupModal } from '@c/Modal';

const HomePage = observer(() => {
  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <Helmet>
        <title>APP</title>
      </Helmet>

      <EventSignupModal />
    </>
  );
});

export default HomePage;
