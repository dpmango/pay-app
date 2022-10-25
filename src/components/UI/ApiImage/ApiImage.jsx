import React, { useState, useContext, useEffect, memo } from 'react';
import cns from 'classnames';

import { Spinner } from '@ui';
import { UiStoreContext } from '@store';

const Image = ({ slug, showSpinner = true, width, height, ...props }) => {
  const [binarySource, setBinarySource] = useState(null);
  const [display, setDisplay] = useState(false);

  const uiContext = useContext(UiStoreContext);

  useEffect(() => {
    const loadImage = async () => {
      const blob = await uiContext.getImage({ slug: slug, width, height });

      if (blob) {
        setBinarySource(URL.createObjectURL(blob));
        setDisplay(true);
      }
    };

    loadImage();
  }, [slug]);

  if (!display) {
    if (showSpinner) return <Spinner theme="inline" />;
    return null;
  }

  return <img src={binarySource} {...props} />;
};

export default memo(Image);
