import React, { useContext, useState, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { Modal, SvgIcon, Button, Image } from '@ui';
import { UiStoreContext } from '@store';
import st from './Error.module.scss';

const ErrorPay = observer(({ retryModal = 'pay', className }) => {
  const uiContext = useContext(UiStoreContext);
  const { modalParams } = uiContext;

  const { t } = useTranslation('modalError');

  const handleRetry = useCallback(() => {
    if (retryModal) {
      uiContext.setModal(retryModal);
    } else {
      uiContext.resetModal();
    }
  }, [modalParams]);

  return (
    <Modal name="error" variant="center" className={className}>
      <div className={st.wrapper}>
        <div className={st.icon}>
          <SvgIcon name="error-circle" />
        </div>
        <div className={st.title}>{t('title')}</div>
        <div className={st.description}>{modalParams && modalParams.text}</div>
        <div className={st.cta}>
          <Button block onClick={handleRetry}>
            {t('action')}
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default ErrorPay;
