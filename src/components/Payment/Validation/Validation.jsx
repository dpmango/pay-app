import React, { useContext, useCallback, useMemo } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Trans, useTranslation } from 'react-i18next';
import cns from 'classnames';

import { SvgIcon, Button, Spinner, ApiImage } from '@ui';
import { PayoutStoreContext } from '@store';

import PaymentUpload from './Upload';
import st from './Validation.module.scss';

const Validation = observer(({ className }) => {
  const payoutContext = useContext(PayoutStoreContext);
  const { payout, documents } = payoutContext;

  const { t } = useTranslation('profile', { keyPrefix: 'validate' });
  const navigate = useNavigate();

  const allFilesReady = useMemo(() => {
    const succeededDocs = documents.filter((x) => x.status === 'Succeeded');

    return succeededDocs.length === documents.length;
  }, [documents]);

  const handleSubmit = useCallback(async () => {
    const selectedPlan = payout.availablePlans.find((x) => x.isDefault);

    if (!selectedPlan) return;

    const res = await payoutContext
      .acceptPayout({
        id: payout.id,
        selectedPlanId: selectedPlan.id,
      })
      .catch(({ message, status }) => {
        alert(message);
        console.log({ message, status });
      });

    if (res) {
      navigate(`/pay/${payout.id}`);
    }
  }, [payout.id, payout.availablePlans]);

  if (!documents.length) {
    return <Spinner />;
  }

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.wrapper}>
          <div className={st.head}>
            <div className={st.headTitle}>{t('title')}</div>
            <div className={st.description}>
              <Trans t={t} i18nKey={'description'} />
            </div>
          </div>

          <div className={st.grid}>
            {documents &&
              documents.map((doc) => {
                const isSelfie = doc.documentType === 'PassportSelfie';
                return (
                  <div className={cns(st.col, isSelfie && st._full)} key={doc.id}>
                    <PaymentUpload
                      id={doc.id}
                      initialStatus={doc.status}
                      icon={isSelfie ? 'upload-selfie' : 'upload-photo'}
                      title={doc.title}
                      mediaTypesSupported={doc.mediaTypesSupported}
                      horizontal={isSelfie}
                    />
                  </div>
                );
              })}
          </div>

          <div className={st.info}>
            <div className={st.description}>{t('info')}</div>
          </div>
        </div>

        <div className={st.cta}>
          <Button block onClick={handleSubmit} disabled={!allFilesReady}>
            {t('action')}
          </Button>
          <div className={st.ctaLink}>{t('terms')}</div>
        </div>
      </div>
    </section>
  );
});

export default Validation;
