import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { SvgIcon, Avatar } from '@ui';
import { UiStoreContext } from '@store';

import st from './Story.module.scss';

const Story = observer(({ id, img, img2x, title, imgPosition, className }) => {
  const uiContext = useContext(UiStoreContext);

  return (
    <div className={cns(st.story, className)}>
      <div className={st.storyImage}>
        <img
          src={img}
          srcSet={img2x && `${img2x} 2x`}
          style={imgPosition && { objectPosition: imgPosition }}
          alt="story"
        />
      </div>
      <div className={st.storyTitle}>{title}</div>
    </div>
  );
});

export default Story;
