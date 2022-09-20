import React, { useContext, useState, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';
import { Link } from 'react-router-dom';

import { Modal, SvgIcon, Button, Image } from '@ui';
import { UiStoreContext } from '@store';
import { formatPrice } from '@helpers';
import st from './PaymentSelect.module.scss';

const ModalPaymentSelect = observer(({ className }) => {
  const [paymentMode, setPaymentMode] = useState(1);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('modalSelectPayment');

  const uiContext = useContext(UiStoreContext);

  const handleSubmit = useCallback(() => {
    if (paymentMode === 'new') {
      uiContext.setModal('addCard');
    } else {
      alert('redirect to banking page');
    }
  }, [paymentMode]);

  return (
    <Modal name="paymentSelect" className={className}>
      <div className={st.title}>{t('title')}</div>

      <div className={st.payments}>
        <div
          className={cns(st.payment, paymentMode === 1 && st._active)}
          onClick={() => setPaymentMode(1)}>
          <div className={st.paymentImage}>
            <Image src="/img/payment/visa.png" have2x={true} />
          </div>
          <div className={st.paymentTitle}>Карта Visa *8644</div>
          <div className={st.paymentCheckbox}>
            <SvgIcon name="checkmark" />
          </div>
        </div>
        <div
          className={cns(st.payment, paymentMode === 2 && st._active)}
          onClick={() => setPaymentMode(2)}>
          <div className={st.paymentImage}>
            <Image src="/img/payment/mastercard.svg" />
          </div>
          <div className={st.paymentTitle}>Карта Mastercard *8633</div>
          <div className={st.paymentCheckbox}>
            <SvgIcon name="checkmark" />
          </div>
        </div>
        <div
          className={cns(st.payment, paymentMode === 3 && st._active)}
          onClick={() => setPaymentMode(3)}>
          <div className={st.paymentImage}>
            <Image src="/img/payment/spb.png" />
          </div>
          <div className={st.paymentTitle}>Система быстрых платежей</div>
          <div className={st.paymentCheckbox}>
            <SvgIcon name="checkmark" />
          </div>
        </div>
        <div
          className={cns(st.payment, paymentMode === 'new' && st._active)}
          onClick={() => setPaymentMode('new')}>
          <div className={st.paymentImage}>
            <SvgIcon name="add-card" />
          </div>
          <div className={st.paymentTitle}>{t('newCard')}</div>
          <div className={st.paymentCheckbox}>
            <SvgIcon name="checkmark" />
          </div>
        </div>
      </div>

      <div className={st.cta}>
        <Button type="link" to="/pay/processing" block onClick={handleSubmit}>
          {t('action')} {formatPrice(2100)} ₽
        </Button>
      </div>
    </Modal>
  );
});

export default ModalPaymentSelect;
