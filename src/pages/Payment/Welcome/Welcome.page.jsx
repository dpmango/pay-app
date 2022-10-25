import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { PayoutStoreContext, UiStoreContext } from '@/store';

import Layout from '@c/Layout';
import { PaymentOrder, PaymentInstallment } from '@c/Payment';
import { ModalError, ModalPay, ModalMethodSelect } from '@c/Modal';

import st from './Welcome.module.scss';

const PaymentWelcomePage = observer(() => {
  const uiContext = useContext(UiStoreContext);
  const payoutContext = useContext(PayoutStoreContext);

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await payoutContext.getPayout(id).catch(({ status }) => {
        if (status === 404) {
          uiContext.setModal('error', { text: 'Такой рассрочки не найдено' });
          navigate('/');
        }
      });

      await payoutContext.getPayoutDocument(id);
    };

    fetchData();
  }, [id]);

  return (
    <Layout variant="clear">
      <Helmet>
        <title>Payment welcome</title>
      </Helmet>

      <PaymentOrder defaultOpen={true} className={st.order} />
      <PaymentInstallment className={st.installment} />

      <ModalError />
      <ModalPay />
      <ModalMethodSelect />
    </Layout>
  );
});

export default PaymentWelcomePage;
