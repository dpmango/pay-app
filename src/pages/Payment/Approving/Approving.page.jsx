import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import Layout from '@c/Layout';
import { StatusApproving } from '@c/Status';
// import st from './PaymentProcessing.module.scss';

const PaymentPage = observer(() => {
  // const uiContext = useContext(UiStoreContext);

  return (
    <Layout variant="empty">
      <Helmet>
        <title>Payment approving</title>
      </Helmet>

      <StatusApproving />
    </Layout>
  );
});

export default PaymentPage;
