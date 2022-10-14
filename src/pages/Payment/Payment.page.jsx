import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';

import { PayoutStoreContext } from '@store';

import Layout from '@c/Layout';
import { PaymentScope, PaymentSchedule, PaymentOrder, PaymentInstallment } from '@c/Payment';
import { ModalPay, ModalMethodSelect, ModalAddCard, ModalError } from '@c/Modal';

import st from './Payment.module.scss';

const PaymentPage = observer(() => {
  const payoutContext = useContext(PayoutStoreContext);

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await payoutContext.getPayout(id).catch(({ status }) => {
        if (status === 404) {
          alert('Не найдно');
          navigate('/');
        }
      });

      await payoutContext.getPayoutDocument(id);
    };

    fetchData();
  }, [id]);

  return (
    <Layout variant="main">
      <Helmet>
        <title>Payment</title>
      </Helmet>

      <PaymentScope className={st.scope} />
      <PaymentSchedule className={st.schedule} />
      <PaymentOrder className={st.order} />

      <ModalPay />
      <ModalMethodSelect />
      <ModalAddCard />
      <ModalError />
    </Layout>
  );
});

export default PaymentPage;
