import React, { useContext, useMemo, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { SvgIcon, Button } from '@ui';

import st from './Approving.module.scss';

const NotFound = observer(({ className }) => {
  const { t } = useTranslation('await', { keyPrefix: 'approving' });

  const radialStyle = useMemo(() => {
    return buildStyles({
      pathTransitionDuration: 0.5,
      pathColor: 'rgba(52, 168, 255, .5)',
      trailColor: 'rgba(52, 168, 255, .5)',
    });
  }, []);

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.wrapper}>
          <div className={st.radial}>
            <CircularProgressbar strokeWidth={10} value={0} maxValue={100} styles={radialStyle} />
            <div className={cns(st.radialContent)}>
              <p>Скоро тут что-то будет</p>
            </div>
          </div>

          <div className={st.info}>
            <Link to="/" className={st.logo}>
              <SvgIcon name="logo" />
            </Link>

            <div className={st.infoTitle}>{t('title')}</div>
            <div className={st.infoDescription}>{t('description')}</div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default NotFound;
