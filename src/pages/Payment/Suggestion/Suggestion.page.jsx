import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { PayoutStoreContext } from '@/store';

import Layout from '@c/Layout';
import { PaymentOrder, PaymentInstallment } from '@c/Payment';
import { ModalPay, ModalMethodSelect, ModalAddCard, ModalError } from '@c/Modal';

import st from './Suggestion.module.scss';

const PaymentSuggestionPage = observer(() => {
  // const uiContext = useContext(UiStoreContext);
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
      await payoutContext.getPayoutPdf(id);
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

      <ModalPay />
      <ModalMethodSelect />
      <ModalAddCard />
      <ModalError />
    </Layout>
  );
});

export default PaymentSuggestionPage;
