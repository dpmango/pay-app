import React, { useContext, useState, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { Modal, SvgIcon, Button, Image } from '@ui';
import { UiStoreContext } from '@store';
import { formatPrice } from '@helpers';
import st from './Error.module.scss';

const ErrorPay = observer(({ className }) => {
  const [paymentMode, setPaymentMode] = useState(1);
  const [loading, setLoading] = useState(false);

  const uiContext = useContext(UiStoreContext);

  return (
    <Modal name="error" variant="center" className={className}>
      <div className={st.wrapper}>
        <div className={st.icon}>
          <SvgIcon name="error-circle" />
        </div>
        <div className={st.title}>Платеж не прошел</div>
        <div className={st.description}>На вашей карте недостаточно средств</div>
        <div className={st.cta}>
          <Button block onClick={() => uiContext.resetModal()}>
            Попробовать заново
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default ErrorPay;
