import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { Button, Spinner, ApiImage } from '@ui';
import { UiStoreContext, PayoutStoreContext } from '@store';
import { formatPrice, formatDate, dateToDDMMMM } from '@utils';

import st from './Scope.module.scss';
import { useCallback } from 'react';

const radialStyle = buildStyles({
  pathTransitionDuration: 0.5,
  pathColor: '#34A8FF',
  trailColor: '#EBEAEA',
});

const Scope = observer(({ className }) => {
  const uiContext = useContext(UiStoreContext);
  const { payout, payoutSumLeft } = useContext(PayoutStoreContext);
  const navigate = useNavigate();

  const { t } = useTranslation('pay', { keyPrefix: 'scope' });

  const handleCtaClick = useCallback(() => {
    uiContext.setModal('pay');
  }, [payout.status]);

  const verboseNextPayment = useMemo(() => {
    try {
      const date = dateToDDMMMM(payout.plannedRedemptions[0].date);
      return `${t('next')} ${date}`;
    } catch {
      return null;
    }
  }, [payout]);

  if (!Object.keys(payout).length) {
    return <Spinner />;
  }

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.radial}>
          <CircularProgressbar
            strokeWidth={6}
            value={payout.sumPaid / payout.sum}
            maxValue={1}
            styles={radialStyle}
          />
          <div className={st.radialContent}>
            <div className={st.image}>
              <ApiImage slug={payout.partner.logoSlug} width={140} />
            </div>
            <div className={st.date}>{formatDate(payout.createdAt)}</div>
            <div className={st.title}>{payout.description}</div>
            <div className={st.payments}>
              <div className={st.paymentsCol}>
                <div className={st.paymentsValue}>{formatPrice(payout.sum)} ₽</div>
                <div className={st.paymentsDescription}>{t('total')}</div>
              </div>
              {payoutSumLeft !== payout.sum && (
                <div className={st.paymentsCol}>
                  <div className={st.paymentsValue}>{formatPrice(payoutSumLeft)} ₽</div>
                  <div className={st.paymentsDescription}>{t('rest')}</div>
                </div>
              )}
            </div>
            <div className={st.deadline}>{verboseNextPayment}</div>
          </div>
        </div>

        {!['Paid', 'Canceled', 'Denied'].includes(payout.status) && (
          <div className={st.cta}>
            <Button block onClick={handleCtaClick}>
              {t('action')}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
});

export default Scope;
