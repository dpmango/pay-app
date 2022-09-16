import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import Layout from '@c/Layout';
import { StatusPayment } from '@c/Status';
import { ModalPaymentSelect } from '@c/Modal';
// import st from './PaymentProcessing.module.scss';

const PaymentPage = observer(() => {
  // const uiContext = useContext(UiStoreContext);

  return (
    <Layout variant="clear">
      <Helmet>
        <title>Payment processing</title>
      </Helmet>

      <StatusPayment />
      <ModalPaymentSelect />
    </Layout>
  );
});

export default PaymentPage;
