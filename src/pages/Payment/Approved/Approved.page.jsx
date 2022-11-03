import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';

import { PayoutStoreContext } from '@store';

import Layout from '@c/Layout';
import { ModalMethodSelect, ModalError } from '@c/Modal';

import { StatusApproved } from '@c/Status';
// import st from './PaymentProcessing.module.scss';

const PaymentPage = observer(() => {
  const payoutContext = useContext(PayoutStoreContext);

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await payoutContext.getPayout(id).catch(({ status }) => {
        if (status === 404) {
          navigate(`/r/${id}/notfound`);
        }
      });
    };

    fetchData();
  }, [id]);

  return (
    <Layout variant="clear">
      <Helmet>
        <title>Payment approved</title>
      </Helmet>

      <StatusApproved />
      <ModalMethodSelect />
      <ModalError retryModal={false} />
    </Layout>
  );
});

export default PaymentPage;
