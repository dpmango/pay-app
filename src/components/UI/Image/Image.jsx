import React, { useState, useMemo, useEffect, memo } from 'react';
import cns from 'classnames';

import { checkImageExists } from '@helpers';

const Image = ({ src, have2x = false, shouldGet2x = true, className, ...props }) => {
  const [source2x, setSource2x] = useState();
  const [display, setDisplay] = useState(have2x);

  const source2xData = useMemo(() => {
    const lastDot = src.lastIndexOf('.');
    const path = src.substring(0, lastDot);
    const ext = src.substring(lastDot + 1, src.length);

    return {
      path: `${path}@2x.${ext}`,
      ext: ext,
    };
  }, [src]);

  useEffect(() => {
    const tryGet2x = async () => {
      const shouldReguest =
        src && shouldGet2x && window.devicePixelRatio > 1 && source2xData.ext !== 'svg';

      const setSource = () => {
        setSource2x(`${source2xData.path} 2x`);
      };

      if (shouldReguest) {
        await checkImageExists(source2xData.path).then(setSource).catch();
      } else if (have2x) {
        setSource();
      }

      setDisplay(true);
    };

    tryGet2x();
  }, [src]);

  if (!display) return null;

  return <img src={src} srcSet={source2x} {...props} />;
};

export default memo(Image);
