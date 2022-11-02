import React, { useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { UiStoreContext, MethodStoreContext, PayoutStoreContext } from '@store';
import { formatPrice, openExternalLink } from '@utils';
import { usePayout } from '@/core';
import { Modal, Button } from '@ui';
import { MethodCard } from '@c/Atom';

import st from './MethodSelect.module.scss';

// Компонент как для выбора метода оплаты (если передать sum в modalParams)
// так и для управления текущими вариантами если (если передать connectOnly пропс)
const ModalMethodSelect = observer(({ className, connectOnly }) => {
  const [activeMethod, setActiveMethod] = useState(null);
  const { t } = useTranslation('modalSelectPayment');

  const uiContext = useContext(UiStoreContext);
  const methodContext = useContext(MethodStoreContext);

  const paymentSum = useMemo(() => {
    if (uiContext.modalParams) {
      return uiContext.modalParams.sum;
    }
    return null;
  }, [uiContext.modalParams]);

  let { id } = useParams();
  const { loading, initPayment, initConnect } = usePayout({
    id,
    paymentSum,
    methodId: activeMethod,
  });

  console.log(activeMethod);
  const handleSubmit = useCallback(async () => {
    if (!connectOnly) {
      // привязка выполняется автоматически если сразу инициировать оплату
      await initPayment();
    } else {
      // флоу отдельно для привязки
      await initConnect();
    }
  }, [initPayment, initConnect]);

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
        <Button block loading={loading} disabled={!activeMethod} onClick={handleSubmit}>
          {!connectOnly && paymentSum ? (
            <>
              {t('action')} {formatPrice(paymentSum)} ₽
            </>
          ) : (
            <> {t('action2')}</>
          )}
        </Button>
      </div>
    </Modal>
  );
});

export default ModalMethodSelect;
