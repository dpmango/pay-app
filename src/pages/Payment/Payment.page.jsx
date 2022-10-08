import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import Layout from '@c/Layout';
import { PaymentScope, PaymentSchedule, PaymentOrder, PaymentInstallment } from '@c/Payment';
import { ModalPay, ModalPaymentSelect, ModalAddCard, ModalError } from '@c/Modal';

import st from './Payment.module.scss';

const PaymentPage = observer(() => {
  // const uiContext = useContext(UiStoreContext);

  return (
    <Layout variant="main">
      <Helmet>
        <title>Payment</title>
      </Helmet>

      <PaymentScope className={st.scope} />
      <PaymentSchedule className={st.schedule} />
      <PaymentOrder className={st.order} />
      <PaymentInstallment className={st.installment} />

      <ModalPay />
      <ModalPaymentSelect />
      <ModalAddCard />
      <ModalError />
    </Layout>
  );
});

export default PaymentPage;
