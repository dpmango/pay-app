import React, { useContext, useState, useMemo, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Spinner } from '@ui';
import { UiStoreContext, PayoutStoreContext, SessionStoreContext } from '@store';
import { formatPrice } from '@utils';

import st from './Installment.module.scss';
import { useEffect } from 'react';

const Installment = observer(({ className }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  const uiContext = useContext(UiStoreContext);
  const { payout } = useContext(PayoutStoreContext);
  const payoutContext = useContext(PayoutStoreContext);
  const sessionContext = useContext(SessionStoreContext);

  const { t } = useTranslation('pay', { keyPrefix: 'installment' });

  const navigate = useNavigate();

  const selectedPlan = useMemo(() => {
    try {
      return payout.availablePlans.find((x) => x.id === selectedPeriod);
    } catch {
      return null;
    }
  }, [selectedPeriod]);

  useEffect(() => {
    if (payout.availablePlans && payout.availablePlans.length) {
      try {
        const defaultId = payout.availablePlans.find((x) => x.isDefault).id;
        setSelectedPeriod(defaultId);
      } catch {
        console.info('no default period');
      }
    }
  }, [payout.availablePlans]);

  const handleAcceptClick = useCallback(async () => {
    if (sessionContext.accessToken) {
      // if (['Offerred', 'IncompleteProfile', 'DocumentsRequired'].includes(payout.status)) {

      const res = await payoutContext
        .acceptPayout({
          id: payout.id,
          selectedPlanId: selectedPlan.id,
        })
        .catch(({ status }) => {
          if (status === 409) {
            navigate(`/pay/${payout.id}`);
          }
        });

      if (res && res.status) {
        if (res.status === 'DocumentsRequired') {
          navigate(`/pay/${payout.id}/validation`);
        }
      }
    } else {
      navigate('/auth');
    }
  }, [payout.id, selectedPlan, sessionContext.accessToken]);

  if (!Object.keys(payout).length) {
    return <Spinner />;
  }

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.head}>
          <SvgIcon name="logo" />
          <span>{t('title')}</span>
        </div>

        {selectedPlan && (
          <div className={st.payments}>
            <div className={st.payment}>
              <div className={st.paymentTitle}>{formatPrice(selectedPlan.firstSum)} ₽</div>
              <div className={st.paymentDesc}>{t('firstPayment')}</div>
            </div>
            <div className={st.payment}>
              <div className={st.paymentTitle}>{formatPrice(selectedPlan.periodicalSum)} ₽</div>
              <div className={st.paymentDesc}>
                {selectedPlan.period === 'Month' && t('inMount')}
              </div>
            </div>
          </div>
        )}

        <div className={st.monts}>
          {payout.availablePlans &&
            payout.availablePlans.map((plan, idx) => (
              <div className={st.month} key={idx}>
                <Button
                  theme={selectedPeriod === plan.id ? 'blue' : 'green'}
                  block
                  onClick={() => setSelectedPeriod(plan.id)}>
                  {plan.duration} {plan.period === 'Month' && t('month')}
                </Button>
              </div>
            ))}
        </div>

        <div className={st.cta}>
          <Button block onClick={handleAcceptClick}>
            {t('action')}
          </Button>
        </div>

        <div className={st.link}>
          <a href="">{t('terms')}</a>
        </div>
      </div>
    </section>
  );
});

export default Installment;
