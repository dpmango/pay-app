import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';

import { PayoutStoreContext } from '@store';
import Layout from '@c/Layout';
import { PaymentValidation } from '@c/Payment';

import st from './Validation.module.scss';

const PaymentValidationPage = observer(() => {
  const payoutContext = useContext(PayoutStoreContext);

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await payoutContext.getPayout(id);
      await payoutContext.getAttachedDocuments(id);
    };

    fetchData();
  }, [id]);

  return (
    <Layout variant="clear">
      <Helmet>
        <title>Documents required</title>
      </Helmet>

      <PaymentValidation className={st.validation} />
    </Layout>
  );
});

export default PaymentValidationPage;
