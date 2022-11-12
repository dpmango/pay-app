import React, { useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import cns from 'classnames';

import { usePayout } from '@/core';
import { Modal, SvgIcon, Button, Image } from '@ui';
import { UiStoreContext, MethodStoreContext, PayoutStoreContext } from '@store';
import { formatPrice } from '@utils';

import { MethodImage } from '@c/Atom';
import st from './Pay.module.scss';

const ModalPay = observer(({ className }) => {
  const [paymentMode, setPaymentMode] = useState(1);
  const { t } = useTranslation('modalPay');

  const uiContext = useContext(UiStoreContext);
  const methodContext = useContext(MethodStoreContext);
  const { payout } = useContext(PayoutStoreContext);

  let { id } = useParams();
  const { loading, paymentOptions, paymentAmount, initPayment } = usePayout({ id, paymentMode });

  const handleSubmit = useCallback(
    async (e) => {
      await initPayment();
    },
    [initPayment]
  );

  const defaultMethod = useMemo(() => {
    if (payout && payout.paymentMethod) {
      return payout.paymentMethod;
    }

    return methodContext.defaultMethod;
  }, [payout.paymentMethod, methodContext.defaultMethod]);

  return (
    <Modal name="pay" className={className}>
      <div className={st.title}>{t('title')}</div>

      <div
        className={st.method}
        onClick={() => !loading && uiContext.setModal('methodSelect', { sum: paymentAmount })}>
        {defaultMethod ? (
          <>
            <div className={st.methodContent}>
              <div className={st.methodlabel}>{t('method')}</div>
              <div className={st.methodValue}>{defaultMethod.title}</div>
            </div>
            <MethodImage className={st.methodImage} iconSlug={defaultMethod.iconSlug} />
          </>
        ) : (
          <>
            <div className={st.methodContent}>
              <div className={st.methodlabel}>{t('method')}</div>
              <div className={st.methodValue}>{t('methodEmpty')}</div>
            </div>
            <MethodImage className={st.methodImage} iconSlug="NewCard" />
          </>
        )}

        <div className={st.methodCaret}>
          <SvgIcon name="caret" />
        </div>
      </div>

      <div className={st.payments}>
        {paymentOptions.map((opt) => (
          <div
            className={cns(st.payment, paymentMode === opt.id && st._active)}
            key={opt.id}
            onClick={() => !loading && setPaymentMode(opt.id)}>
            <div className={st.paymentContent}>
              <div className={st.paymentValue}>{formatPrice(opt.value)} ₽</div>
              <div className={st.paymentDescription}>{t(opt.transKey)}</div>
            </div>
            <div className={st.paymentCheckbox}>
              <SvgIcon name="checkmark" />
            </div>
          </div>
        ))}
      </div>

      <div className={st.cta}>
        <Button type="button" block loading={loading} onClick={handleSubmit}>
          {t('payPartial')} {formatPrice(paymentAmount)} ₽
        </Button>
      </div>
    </Modal>
  );
});

export default ModalPay;
