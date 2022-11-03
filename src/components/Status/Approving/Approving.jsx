import React, { useContext, useMemo, useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { toast } from 'react-toastify';

import { PayoutStoreContext } from '@store';
import { SvgIcon, Button } from '@ui';
import { nonLinearProgress } from '@utils';

import st from './Approving.module.scss';

const NotFound = observer(({ className }) => {
  const [progress, setProgress] = useState(0);

  const payoutContext = useContext(PayoutStoreContext);
  const { t } = useTranslation('await', { keyPrefix: 'approving' });

  const { id } = useParams();
  const navigate = useNavigate();

  const radialStyle = useMemo(() => {
    return buildStyles({
      pathTransitionDuration: 15,
      pathColor: 'rgba(52, 168, 255, .5)',
      trailColor: 'rgba(52, 168, 255, .5)',
    });
  }, []);

  let interval = useRef(null);
  useEffect(() => {
    setProgress(90);

    interval.current = setInterval(async () => {
      await payoutContext.getPayout(id, false).then((res) => {
        if (res.status === 'Approved') {
          clearInterval(interval.current);
          setProgress(100);
          navigate(`/pay/${id}/approved`);
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, []);

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
