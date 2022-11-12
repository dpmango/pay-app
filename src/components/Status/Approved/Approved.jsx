import React, { useContext, useMemo, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { SvgIcon, Button, Spinner } from '@ui';
import { UiStoreContext, PayoutStoreContext } from '@store';

import st from './Approved.module.scss';

const Approved = observer(({ className }) => {
  const uiContext = useContext(UiStoreContext);
  const payoutContext = useContext(PayoutStoreContext);
  const { payout } = payoutContext;

  const { t } = useTranslation('await', { keyPrefix: 'approved' });

  const radialStyle = useMemo(() => {
    return buildStyles({
      pathTransitionDuration: 0.5,
      pathColor: 'rgba(52, 168, 255, .5)',
      trailColor: 'rgba(52, 168, 255, .5)',
    });
  }, []);

  const selectedPlan = useMemo(() => {
    try {
      return payout.availablePlans.find((x) => x.isDefault);
    } catch {
      return {};
    }
  }, [payout]);

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.wrapper}>
          <div className={st.radial}>
            <CircularProgressbar strokeWidth={10} value={0} maxValue={100} styles={radialStyle} />
            <div className={st.radialContent}>
              <SvgIcon name="checkmark" />
            </div>
          </div>

          <div className={st.info}>
            <div className={st.infoTitle}>{t('title')}</div>
            <div className={st.infoDescription}>{t('description')}</div>
          </div>

          <div className={cns(st.cta)}>
            <Button
              block
              onClick={() => uiContext.setModal('methodSelect', { sum: selectedPlan.firstSum })}>
              {t('action')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Approved;
