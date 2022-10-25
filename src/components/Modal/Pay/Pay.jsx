import React, { useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import cns from 'classnames';

import { Modal, SvgIcon, Button, Image } from '@ui';
import { UiStoreContext, PayoutStoreContext, MethodStoreContext } from '@store';
import { formatPrice, openExternalLink } from '@utils';

import { MethodImage } from '@c/Atom';
import st from './Pay.module.scss';

const ModalPay = observer(({ className }) => {
  const [paymentMode, setPaymentMode] = useState(1);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('modalPay');

  const uiContext = useContext(UiStoreContext);
  const payoutContext = useContext(PayoutStoreContext);
  const methodContext = useContext(MethodStoreContext);
  const { payout } = payoutContext;

  let { id } = useParams();
  const navigate = useNavigate();

  const paymentOptions = useMemo(() => {
    return [
      {
        id: 1,
        value: payoutContext.closestPaymentSum,
        transKey: 'closest',
      },
      {
        id: 2,
        value: payoutContext.payoutSumLeft,
        transKey: 'payAll',
      },
    ];
  }, [payoutContext.closestPaymentSum, payout.sum]);

  const paymentAmount = useMemo(() => {
    return paymentOptions.find((x) => x.id === paymentMode).value;
  }, [paymentOptions, paymentMode]);

  const handleSubmit = useCallback(
    async (e, methodID) => {
      setLoading(true);

      const { data, status } = await payoutContext
        .initPayment({
          id: payout.id,
          sum: paymentAmount,
          paymentMethodId: methodID || methodContext.defaultMethodId,
          selectedPlanId: payout.status === 'Active' ? undefined : payoutContext.selectedPlanId,
          returnUrl: `${window.location.origin}/pay/${id}`,
        })
        .catch(({ status }) => {
          if (status === 400) {
            uiContext.setModal('methodSelect');
          }
        });

      setLoading(false);
      if (!data) return;

      if (data.status === 'Failed') {
        uiContext.setModal('error', { text: data.errorDescription });
      } else if (status === 202 && data.redirectUrls) {
        if (data.redirectUrls.type === 'BankSelection') {
          payoutContext.setSBPList(data.redirectUrls.bankSelection);
          navigate(`/pay/${id}/sbp`);
        } else if (data.redirectUrls.type === 'Unconditional') {
          openExternalLink(data.redirectUrls.defaultUrl);
        }
      } else {
        payoutContext.getPayout(id);
        uiContext.resetModal();
      }
    },
    [id, paymentAmount, payout, methodContext.defaultMethodId, payoutContext.selectedPlanId]
  );

  useEffect(() => {
    if (uiContext.modalParams && uiContext.modalParams.paymentMethodId) {
      handleSubmit(null, uiContext.modalParams.paymentMethodId);
    }
  }, [uiContext.modalParams]);

  return (
    <Modal name="pay" className={className}>
      <div className={st.title}>{t('title')}</div>

      <div
        className={st.method}
        onClick={() => uiContext.setModal('methodSelect', { sum: paymentAmount })}>
        {methodContext.defaultMethod ? (
          <>
            <div className={st.methodContent}>
              <div className={st.methodlabel}>{t('method')}</div>
              <div className={st.methodValue}>{methodContext.defaultMethod.title}</div>
            </div>
            <MethodImage
              className={st.methodImage}
              iconSlug={methodContext.defaultMethod.iconSlug}
            />
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
            onClick={() => setPaymentMode(opt.id)}>
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
