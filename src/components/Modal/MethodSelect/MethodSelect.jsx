import React, { useContext, useState, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';
import { Link } from 'react-router-dom';

import { Modal, SvgIcon, Button, Image } from '@ui';
import { UiStoreContext, MethodStoreContext } from '@store';
import { formatPrice } from '@utils';
import st from './MethodSelect.module.scss';
import { useEffect } from 'react';

const ModalMethodSelect = observer(({ className, connectOnly }) => {
  const [paymentMode, setPaymentMode] = useState(1);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('modalSelectPayment');

  const uiContext = useContext(UiStoreContext);
  const methodContext = useContext(MethodStoreContext);

  const handleSubmit = useCallback(async () => {
    uiContext.resetModal();

    const data = await methodContext.connectMethod({
      paymentMethodId: paymentMode,
      returnUrl: window.location.href,
    });

    console.log({ data });

    // redirect to="/pay/processing"

    // if (paymentMode === 'new') {
    //   uiContext.setModal('addCard');
    // }
  }, [paymentMode]);

  useEffect(() => {
    if (methodContext.defaultMethodId) {
      setPaymentMode(methodContext.defaultMethodId);
    }
  }, [methodContext.defaultMethodId]);

  return (
    <Modal name="methodSelect" className={className}>
      <div className={st.title}>{t('title')}</div>

      <div className={st.payments}>
        {methodContext.methods.map((method) => (
          <div
            className={cns(st.payment, paymentMode === method.id && st._active)}
            key={method.id}
            onClick={() => setPaymentMode(method.id)}>
            <div className={st.paymentImage}>
              {method.iconSlug === 'NewCard' && <SvgIcon name="add-card" />}
              {method.iconSlug === 'SBP' && <Image src="/img/payment/spb.png" />}
              {/* <Image src="/img/payment/mastercard.svg" /> */}
              {/* <Image src="/img/payment/visa.png" have2x={true} /> */}
            </div>
            <div className={st.paymentTitle}>
              {method.title} {method.status}
            </div>
            <div className={st.paymentCheckbox}>
              <SvgIcon name="checkmark" />
            </div>
          </div>
        ))}
      </div>

      <div className={st.cta}>
        <Button type="link" block onClick={handleSubmit}>
          {!connectOnly ? (
            <>
              {t('action')} {formatPrice(2100)} ₽
            </>
          ) : (
            <>Привязать</>
          )}
        </Button>
      </div>
    </Modal>
  );
});

export default ModalMethodSelect;
