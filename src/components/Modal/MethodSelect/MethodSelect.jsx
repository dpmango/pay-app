import React, { useContext, useState, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { UiStoreContext, MethodStoreContext } from '@store';
import { formatPrice } from '@utils';
import { Modal, Button } from '@ui';
import { MethodCard } from '@c/Atom';

import st from './MethodSelect.module.scss';
import { useEffect } from 'react';

// Компонент как для выбора метода оплаты (если передать sum в modalParams)
// так и для управления текущими вариантами если (если передать connectOnly пропс)
const ModalMethodSelect = observer(({ className, connectOnly }) => {
  const [activeMethod, setActiveMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('modalSelectPayment');

  const uiContext = useContext(UiStoreContext);
  const methodContext = useContext(MethodStoreContext);

  const paymentSum = useMemo(() => {
    if (uiContext.modalParams) {
      return uiContext.modalParams.sum;
    }
    return null;
  }, [uiContext.modalParams]);

  const handleSubmit = useCallback(async () => {
    let continuePayWithParams;

    continuePayWithParams = { paymentMethodId: activeMethod };

    // "Новую карту", но вместо того, чтобы сразу выполнить платеж с использованием этого метода оплаты началась его привязка.
    // так быть не должно - нужно сразу оплачивать нужную сумму методом "Новая карта". привязка при этом выполняется автоматически

    // connect or continue pay
    // if (methodContext.isAttachedMethod(activeMethod)) {
    //   continuePayWithParams = { paymentMethodId: activeMethod };
    // } else {
    // const { data, status } = await methodContext.connectMethod({
    //   paymentMethodId: activeMethod,
    //   returnUrl: `${window.location.href}?attachedCallback`,
    // });

    // if (status === 202 && data.redirectUrls) {
    //   window.location.href = data.redirectUrls.defaultUrl;
    // }
    // }

    if (!connectOnly) {
      uiContext.setModal('pay', continuePayWithParams || {});
    } else {
      uiContext.resetModal();
    }
  }, [activeMethod]);

  useEffect(() => {
    if (methodContext.defaultMethodId) {
      setActiveMethod(methodContext.defaultMethodId);
    }
  }, [methodContext.defaultMethodId]);

  return (
    <Modal name="methodSelect" className={className}>
      <div className={st.title}>{t('title')}</div>

      <div className={st.payments}>
        <div className={st.paymentsGroup}>
          {methodContext.availableMethods.map((method) => (
            <MethodCard
              key={method.id}
              id={method.id}
              title={method.title}
              status={method.status}
              iconSlug={method.iconSlug}
              isActive={method.id === activeMethod}
              onSelect={(id) => setActiveMethod(id)}
            />
          ))}
        </div>

        <div className={st.paymentsGroup}>
          {methodContext.attachedMethods.map((method) => (
            <MethodCard
              key={method.id}
              {...method}
              isActive={method.id === activeMethod}
              onSelect={(id) => setActiveMethod(id)}
            />
          ))}
        </div>
      </div>

      <div className={st.cta}>
        <Button type="link" block onClick={handleSubmit}>
          {!connectOnly && paymentSum ? (
            <>
              {t('action')} {formatPrice(paymentSum)} ₽
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
