import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import cns from 'classnames';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { SvgIcon } from '@ui';
import { formatPrice } from '@helpers';

import st from './ScheduleCard.module.scss';

const ScheduleCard = ({ id, number, status, price, total, deadline, className }) => {
  const progress = useMemo(() => {
    const percent = price / 12000;

    const round = percent.toLocaleString('en', {
      useGrouping: false,
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });

    return +round;
  }, [price]);

  const isCurrentPayment = status === 5;

  const deadlinyByStatus = useMemo(() => {
    let topic = '';
    switch (status) {
      case 1:
        topic = 'Спишется';
        break;
      case 5:
        topic = 'Спишется';
        break;
      case 10:
        topic = 'Оплачен';
        break;
      default:
        break;
    }

    return `${topic} ${deadline}`;
  }, [status, deadline]);

  const radialStyle = useMemo(() => {
    let color = '';
    switch (status) {
      case 1:
        color = '#EBEAEA';
        break;
      case 5:
        color = '#34A8FF';
        break;
      case 10:
        color = '#A7C97C';
        break;
      default:
        break;
    }

    return buildStyles({
      pathTransitionDuration: 0.5,
      pathColor: color,
      trailColor: '#EBEAEA',
    });
  }, [status]);

  return (
    <div className={cns(st.card, isCurrentPayment && st._current, className)}>
      <div className={st.cardLeft}>
        <div className={st.cardRadial}>
          <CircularProgressbar
            strokeWidth={10}
            value={progress}
            maxValue={1}
            styles={radialStyle}
          />
          <div className={st.cardNumber}>{number}</div>
        </div>
      </div>

      <div className={st.cardContent}>
        <div className={st.cardTitle}>{formatPrice(price)} ₽</div>
        <div className={st.cardDescription}>{deadlinyByStatus}</div>
      </div>

      <div className={cns(st.cardAction, isCurrentPayment && st._active)}>
        <div className={st.cardActionIcon}>
          <SvgIcon name="card" />
        </div>
        <div className={st.cardActionName}>Оплатить</div>
      </div>
    </div>
  );
};

export default ScheduleCard;
