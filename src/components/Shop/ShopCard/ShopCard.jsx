import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import cns from 'classnames';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { formatPrice } from '@helpers';

import st from './ShopCard.module.scss';
const radialStyle = buildStyles({
  pathTransitionDuration: 0.5,
  pathColor: '#34A8FF',
  trailColor: '#EBEAEA',
});

const ShopCard = ({ id, company, description, payments, isShopCard, className }) => {
  const progress = useMemo(() => {
    const percent = payments.current / payments.total;

    const round = percent.toLocaleString('en', {
      useGrouping: false,
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });

    return +round;
  }, [payments]);

  const linkUrl = useMemo(() => {
    return `${isShopCard ? '/shop' : '/pay'}/${id}`;
  }, [id, isShopCard]);

  return (
    <Link to={linkUrl} className={cns(st.card, className)}>
      <div className={st.cardLeft}>
        <div className={st.cardRadial}>
          <CircularProgressbar
            strokeWidth={10}
            value={progress}
            maxValue={1}
            styles={radialStyle}
          />
          <div className={st.cardLogo}>
            {company.logo && <img src={company.logo} alt={company.name} />}
          </div>
        </div>
      </div>

      <div className={st.cardContent}>
        <div className={st.cardTitle}>{company.title}</div>
        {description && <div className={st.cardDescription}>{description}</div>}
      </div>

      {payments && !isShopCard && (
        <div className={st.cardMeta}>
          <div className={st.cardMetaPrimary}>{formatPrice(payments.current)} ₽</div>
          <div className={st.cardMetaSecondary}>из {formatPrice(payments.total)} ₽</div>
        </div>
      )}
    </Link>
  );
};

export default ShopCard;
