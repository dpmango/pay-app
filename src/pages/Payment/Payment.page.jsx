import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { PayoutStoreContext, UiStoreContext } from '@store';
import { usePayoutNavigation } from '@/core';

import Layout from '@c/Layout';
import { PaymentScope, PaymentSchedule, PaymentOrder, PaymentInstallment } from '@c/Payment';
import { ModalPay, ModalMethodSelect, ModalAddCard, ModalError } from '@c/Modal';

import st from './Payment.module.scss';

const PaymentPage = observer(() => {
  const payoutContext = useContext(PayoutStoreContext);
  const uiContext = useContext(UiStoreContext);

  let { id } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { navigatePayoutByStatus } = usePayoutNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const payout = await payoutContext.getPayout(id).catch(({ status }) => {
        if (status === 404) {
          navigate(`/r/${id}/notfound`);
        }
      });

      if (payout) {
        navigatePayoutByStatus({ status: payout.status, id });

        await payoutContext.getPayoutDocument(id);
      }
    };

    fetchData();

    if (searchParams.get('attachedCallback') !== null) {
      uiContext.setModal('pay');
    }
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
