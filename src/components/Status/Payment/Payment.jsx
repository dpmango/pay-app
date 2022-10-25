import React, { useContext, useMemo, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { SvgIcon, Button } from '@ui';
import { UiStoreContext } from '@store';

import st from './Payment.module.scss';

const Payment = observer(({ className }) => {
  const [status, setStatus] = useState(1);
  const [progress, setProgress] = useState(0);
  const uiContext = useContext(UiStoreContext);
  const { t } = useTranslation('await', { keyPrefix: 'payment' });

  const radialStyle = useMemo(() => {
    let pathColor, trailColor;

    if (status === 1) {
      pathColor = '#34A8FF';
      trailColor = 'rgba(52, 168, 255, .5)';
    } else if (status === 2) {
      pathColor = 'rgba(52, 168, 255, .5)';
      trailColor = 'rgba(52, 168, 255, .5)';
    } else if (status === 3) {
      pathColor = 'transparent';
      trailColor = 'rgba(205, 161, 161, .5)';
    }

    return buildStyles({
      pathTransitionDuration: 0.5,
      pathColor,
      trailColor,
    });
  }, [status]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev === 100) {
          clearInterval(interval);
          return 100;
        } else {
          return prev + 1;
        }
      });
    }, 200);
  }, []);

  useEffect(() => {
    if (progress === 100 && status !== 3) {
      setStatus(2);
    }
  }, [progress, status]);

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.wrapper}>
          <div className={st.radial}>
            <CircularProgressbar
              strokeWidth={10}
              value={progress}
              maxValue={100}
              styles={radialStyle}
            />
            <div className={cns(st.radialContent, status === 3 && st._error)}>
              {status === 1 && <SvgIcon name="rub" />}
              {status === 2 && <SvgIcon name="checkmark" />}
              {status === 3 && <SvgIcon name="close" />}
            </div>
          </div>

          <div className={st.info}>
            {status === 1 && (
              <>
                <div className={st.infoTitle}>{t('title')}</div>
                <div className={st.infoDescription}>{t('description')}</div>
              </>
            )}
            {status === 2 && (
              <>
                <div className={st.infoTitle}>{t('done.title')}</div>
                <div className={st.infoDescription}>{t('done.description')}</div>
              </>
            )}
            {status === 3 && (
              <>
                <div className={st.infoTitle}>{t('error.title')}</div>
                <div className={st.infoDescription}>{t('error.description')}</div>
              </>
            )}
            <p
              onClick={() => {
                setStatus(3);
                setProgress(100);
              }}
              className={st._tempTrigger}>
              Тригер на ошибку
            </p>
          </div>

          <div className={cns(st.cta, progress === 100 && st._visible)}>
            {[1, 2].includes(status) ? (
              <Button type="link" to="/" block>
                {t('actions.continue')}
              </Button>
            ) : (
              <Button block onClick={() => uiContext.setModal('methodSelect')}>
                {t('actions.connect')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Payment;
