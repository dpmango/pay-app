import React, { useContext, useMemo, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { SvgIcon, Button } from '@ui';

import st from './NotFound.module.scss';

const NotFound = observer(({ className }) => {
  const { t } = useTranslation('await', { keyPrefix: 'payment' });

  const radialStyle = useMemo(() => {
    return buildStyles({
      pathTransitionDuration: 0.5,
      pathColor: 'transparent',
      trailColor: 'rgba(205, 161, 161, .5)',
    });
  }, []);

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.wrapper}>
          <div className={st.radial}>
            <CircularProgressbar strokeWidth={10} value={0} maxValue={100} styles={radialStyle} />
            <div className={cns(st.radialContent, st._error)}>
              <SvgIcon name="close" />
            </div>
          </div>

          <div className={st.info}>
            <div className={st.infoTitle}>{t('notfound.title')}</div>
            <div className={st.infoDescription}>{t('notfound.description')}</div>
          </div>

          <div className={cns(st.cta, st._visible)}>
            <Button type="link" to="/" block>
              {t('actions.back')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default NotFound;
