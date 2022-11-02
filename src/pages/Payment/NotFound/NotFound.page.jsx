import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import Layout from '@c/Layout';
import { StatusNotFound } from '@c/Status';
// import st from './PaymentProcessing.module.scss';

const PaymentPage = observer(() => {
  // const uiContext = useContext(UiStoreContext);

  return (
    <Layout variant="clear">
      <Helmet>
        <title>Payment notfound</title>
      </Helmet>

      <StatusNotFound />
    </Layout>
  );
});

export default PaymentPage;
