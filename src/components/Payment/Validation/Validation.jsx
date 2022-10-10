import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Trans, useTranslation } from 'react-i18next';
import cns from 'classnames';

import { SvgIcon, Button, Spinner, ApiImage } from '@ui';
import { PayoutStoreContext } from '@store';

import PaymentUpload from './Upload';
import st from './Validation.module.scss';

const Validation = observer(({ className }) => {
  const payoutContext = useContext(PayoutStoreContext);
  const { documents } = payoutContext;

  const { t } = useTranslation('profile', { keyPrefix: 'validate' });

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
              documents.map((doc) => (
                <div className={st.col} key={doc.id}>
                  {/* {doc.status} || {doc.isRequired ? 'req' : 'no req'} */}
                  <PaymentUpload icon="upload-photo" title={doc.title} id={doc.id} />
                </div>
              ))}

            <div className={cns(st.col, st._full)}>
              <PaymentUpload icon="upload-selfie" horizontal={true} title={t('passportSelfie')} />
            </div>
          </div>

          <div className={st.info}>
            <div className={st.description}>{t('info')}</div>
          </div>
        </div>

        <div className={st.cta}>
          <Button block>{t('action')}</Button>
          <div className={st.ctaLink}>{t('terms')}</div>
        </div>
      </div>
    </section>
  );
});

export default Validation;
