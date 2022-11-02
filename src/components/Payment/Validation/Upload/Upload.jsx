import React, { useMemo, useState, useCallback, useEffect, useContext, useRef } from 'react';
import cns from 'classnames';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { SvgIcon } from '@ui';
import { PayoutStoreContext } from '@store';

import st from './Upload.module.scss';

const Upload = ({ icon, title, id, initialStatus, mediaTypesSupported, horizontal, className }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(0);

  const payoutContext = useContext(PayoutStoreContext);
  const { t } = useTranslation('pay', { keyPrefix: 'validation' });

  let { id: payoutId } = useParams();

  const radialStyle = useMemo(() => {
    let pathColor, trailColor;

    // pending, success, error
    if (status === 1) {
      pathColor = '#A7C97C';
      trailColor = 'rgb(167, 201, 124, .5)';
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

  const handleFileChange = useCallback(
    async (e) => {
      const file = e.target.files[0];

      if (!mediaTypesSupported.includes(file.type)) {
        toast.error(t('upload.mime'));
        return;
      }

      await payoutContext
        .uploadDocument({
          id: payoutId,
          docId: id,
          file,
          progress: (n) => {
            setProgress(n);
          },
        })
        .then(() => {
          setStatus(1);
        })
        .catch((_err) => {
          setStatus(3);
        });
    },
    [payoutId, id]
  );

  let interval = useRef(null);
  useEffect(() => {
    if (initialStatus === 'Processing') {
      setStatus(1);
      setProgress(5);

      interval.current = setInterval(async () => {
        await payoutContext.getAttachedDocument({ id: payoutId, docId: id }).then((res) => {
          setProgress((prev) => {
            if (prev <= 50) {
              return prev + 10;
            } else if (prev <= 80) {
              return prev + 5;
            }
            return prev;
          });
          if (res.status === 'Succeeded') {
            clearInterval(interval.current);
            setStatus(2);
            setProgress(100);
          }
        });
      }, 1000);
    }

    if (initialStatus === 'Succeeded') {
      setStatus(2);
      setProgress(100);
    }

    if (initialStatus === 'Failed') {
      setStatus(3);
      setProgress(100);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [initialStatus]);

  return (
    <div className={cns(st.upload, horizontal && st._horizontal, className)}>
      <input type="file" id={id} onChange={handleFileChange} />

      <label htmlFor={id} className={st.trigger}>
        <div className={st.image}>
          {progress !== 0 ? (
            <div className={st.status}>
              <div className={st.radial}>
                <CircularProgressbar
                  strokeWidth={10}
                  value={progress}
                  maxValue={100}
                  styles={radialStyle}
                />
                <div
                  className={cns(
                    st.radialContent,
                    status === 2 && st._success,
                    status === 3 && st._error
                  )}>
                  {[1, 2].includes(status) && <SvgIcon name="checkmark" />}
                  {status === 3 && <SvgIcon name="close" />}
                </div>
              </div>
            </div>
          ) : (
            <SvgIcon name={icon} clearColors={false} />
          )}
        </div>
        <div className={st.title}>{title}</div>
      </label>
    </div>
  );
};

export default Upload;
