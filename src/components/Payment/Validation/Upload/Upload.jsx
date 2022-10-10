import React, { useMemo, useState, useCallback, useEffect, useContext } from 'react';
import cns from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useParams } from 'react-router-dom';

import { SvgIcon, Button } from '@ui';
import { PayoutStoreContext } from '@store';

import st from './Upload.module.scss';

const Upload = ({ icon, title, id, horizontal, className }) => {
  // const [file, setFile] = useState(null);
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
      // setFile(file);

      const res = await payoutContext
        .uploadDocument({
          id: payoutId,
          docId: id,
          file,
          progress: (e) => {
            setProgress(e);
          },
        })
        .catch(() => {
          setStatus(2);
        });

      if (res) {
        setStatus(1);
      }
      setStatus(1);
    },
    [payoutId, id]
  );

  useEffect(() => {
    if (progress === 100 && status !== 2) {
      setStatus(2);
    }
  }, [progress, status]);

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
