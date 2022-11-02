import React, { useContext, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { PayoutStoreContext, UiStoreContext } from '@/store';

import Layout from '@c/Layout';
import { PaymentOrder, PaymentUpgrade, PaymentInstallment } from '@c/Payment';
import { ModalError, ModalPay, ModalMethodSelect } from '@c/Modal';

import st from './Welcome.module.scss';

const PaymentWelcomePage = observer(() => {
  const uiContext = useContext(UiStoreContext);
  const payoutContext = useContext(PayoutStoreContext);
  const { payout } = payoutContext;

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await payoutContext.getPayout(id).catch(({ status }) => {
        if (status === 404) {
          console.log('404 с welcome');
          uiContext.setModal('error', { text: 'Такой рассрочки не найдено' });
          navigate('/');
        }
      });

      await payoutContext.getPayoutDocument(id);
    };

    fetchData();
  }, [id]);

  const isUpgrade = useMemo(() => {
    return payout.sumPaid > 0;
  }, [payout]);

  return (
    <Layout variant="clear">
      <Helmet>
        <title>Payment welcome</title>
      </Helmet>

      <PaymentOrder defaultOpen={true} isUpgrade={isUpgrade} className={st.order} />
      {isUpgrade && <PaymentUpgrade className={st.upgrade} />}
      <PaymentInstallment isUpgrade={isUpgrade} className={st.installment} />

      <ModalError />
      <ModalPay />
      <ModalMethodSelect />
    </Layout>
  );
});

export default PaymentWelcomePage;
