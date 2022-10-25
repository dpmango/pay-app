import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';

import { PayoutStoreContext } from '@store';
import Layout from '@c/Layout';
import { PaymentSBP } from '@c/Payment';

// import st from './Validation.module.scss';

const PaymentSBPPage = observer(() => {
  const payoutContext = useContext(PayoutStoreContext);

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (payoutContext.sbpList.length === 0) {
      navigate(`/page/${id}`);
    }
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>SBP</title>
      </Helmet>

      <PaymentSBP />
    </Layout>
  );
});

export default PaymentSBPPage;
