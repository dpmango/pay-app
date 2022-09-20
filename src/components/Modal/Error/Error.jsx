import React, { useContext, useState, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { Modal, SvgIcon, Button, Image } from '@ui';
import { UiStoreContext } from '@store';
import { formatPrice } from '@helpers';
import st from './Error.module.scss';

const ErrorPay = observer(({ className }) => {
  const [paymentMode, setPaymentMode] = useState(1);
  const [loading, setLoading] = useState(false);

  const uiContext = useContext(UiStoreContext);
  const { t } = useTranslation('modalError');

  return (
    <Modal name="error" variant="center" className={className}>
      <div className={st.wrapper}>
        <div className={st.icon}>
          <SvgIcon name="error-circle" />
        </div>
        <div className={st.title}>{t('title')}</div>
        <div className={st.description}>{t('description')}</div>
        <div className={st.cta}>
          <Button block onClick={() => uiContext.resetModal()}>
            {t('action')}
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default ErrorPay;
