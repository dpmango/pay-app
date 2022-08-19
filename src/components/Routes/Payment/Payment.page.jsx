import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import { PaymentScope, PaymentSchedule, PaymentOrder } from '@c/Payment';
import { ModalPay, ModalPaymentSelect, ModalAddCard } from '@c/Modal';

import st from './Payment.module.scss';

const PaymentPage = observer(() => {
  // const uiContext = useContext(UiStoreContext);

  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>

      <PaymentScope className={st.scope} />
      <PaymentSchedule className={st.schedule} />
      <PaymentOrder className={st.order} />

      <ModalPay />
      <ModalPaymentSelect />
      <ModalAddCard />
    </>
  );
});

export default PaymentPage;
