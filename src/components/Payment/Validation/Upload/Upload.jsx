import React, { useMemo, useState, useCallback, useEffect, useContext } from 'react';
import cns from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useParams } from 'react-router-dom';

import { SvgIcon, Button } from '@ui';
import { PayoutStoreContext } from '@store';

import st from './Upload.module.scss';

const Upload = ({ icon, title, id, initialStatus, mediaTypesSupported, horizontal, className }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(0);

  const payoutContext = useContext(PayoutStoreContext);

  let { id: payoutId } = useParams();

  const radialStyle = useMemo(() => {
    let pathColor, trailColor;

    if (status === 1) {
      pathColor = 'rgba(52, 168, 255, .5)';
      trailColor = 'rgba(52, 168, 255, .5)';
    } else if (status === 2) {
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
        alert('неподдерживаемый формат');
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
          setStatus(2);
        });
    },
    [payoutId, id]
  );

  let interval = null;
  useEffect(() => {
    if (initialStatus === 'Succeeded') {
      setStatus(1);
      setProgress(100);
    }

    if (initialStatus === 'Processing') {
      interval = setInterval(async () => {
        await payoutContext.getAttachedDocument({ id: payoutId, docId: id }).then((res) => {
          if (res.status === 'Succeeded') {
            clearInterval(interval);
          }
        });
      }, 1000);
    }

    if (initialStatus === 'Failed') {
      setStatus(2);
      setProgress(100);
    }
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
                <div className={cns(st.radialContent, status === 2 && st._error)}>
                  {status === 1 && <SvgIcon name="checkmark" />}
                  {status === 2 && <SvgIcon name="close" />}
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
