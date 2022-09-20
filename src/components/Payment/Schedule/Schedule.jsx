import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';
import { useTranslation } from 'react-i18next';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { SvgIcon, Button, Image } from '@ui';
import { UiStoreContext } from '@store';

import ScheduleCard from './ScheduleCard';
import st from './Schedule.module.scss';
import { payments } from './mockData';

const radialStyle = buildStyles({
  pathTransitionDuration: 0.5,
  pathColor: '#34A8FF',
  trailColor: '#EBEAEA',
});

const Schedule = observer(({ className }) => {
  const uiContext = useContext(UiStoreContext);
  const { t } = useTranslation('pay', { keyPrefix: 'schedule' });

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.box}>
          <div className={st.head}>{t('title')}</div>

          <div className={st.list}>
            {payments &&
              payments.map((payment) => (
                <ScheduleCard {...payment} className={st.listCard} key={payment.id} />
              ))}
          </div>

          <div className={st.tiles}>
            <div className={st.tile}>
              <div className={st.tileLabel}>{t('rest')}</div>
              <div className={st.tileValue}>4200 ₽</div>
            </div>
            <div className={st.tile}>
              <div className={st.tileLabel}>Карта Visa *8644</div>
              <div className={st.tileValue}>
                <Image src="/img/payment/visa.png" have2x={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Schedule;
