import React, { useContext, useState, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { Modal, SvgIcon, Button, Image } from '@ui';
import { UiStoreContext } from '@store';
import { formatPrice } from '@helpers';
import st from './Pay.module.scss';

const ModalPay = observer(({ className }) => {
  const [paymentMode, setPaymentMode] = useState(1);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('modalPay');

  const uiContext = useContext(UiStoreContext);

  const paymentAmount = useMemo(() => {
    if (paymentMode === 1) {
      return 2100;
    } else {
      return 4200;
    }
  }, [paymentMode]);

  return (
    <Modal name="pay" className={className}>
      <div className={st.title}>{t('title')}</div>
      <div className={st.method} onClick={() => uiContext.setModal('paymentSelect')}>
        <div className={st.methodContent}>
          <div className={st.methodlabel}>{t('method')}</div>
          <div className={st.methodValue}>Карта Visa *8644</div>
        </div>
        <div className={st.methodImage}>
          <Image src="/img/payment/visa.png" have2x={true} />
        </div>
        <div className={st.methodCaret}>
          <SvgIcon name="caret" />
        </div>
      </div>

      <div className={st.payments}>
        <div
          className={cns(st.payment, paymentMode === 1 && st._active)}
          onClick={() => setPaymentMode(1)}>
          <div className={st.paymentContent}>
            <div className={st.paymentValue}>{formatPrice(2100)} ₽</div>
            <div className={st.paymentDescription}>{t('closest')}</div>
          </div>
          <div className={st.paymentCheckbox}>
            <SvgIcon name="checkmark" />
          </div>
        </div>
        <div
          className={cns(st.payment, paymentMode === 2 && st._active)}
          onClick={() => setPaymentMode(2)}>
          <div className={st.paymentContent}>
            <div className={st.paymentValue}>{formatPrice(4200)} ₽</div>
            <div className={st.paymentDescription}>{t('payAll')}</div>
          </div>
          <div className={st.paymentCheckbox}>
            <SvgIcon name="checkmark" />
          </div>
        </div>
      </div>

      <div className={st.cta}>
        <Button type="link" to="/pay/processing" block>
          {t('payPartial')} {formatPrice(paymentAmount)} ₽
        </Button>
      </div>
    </Modal>
  );
});

export default ModalPay;
