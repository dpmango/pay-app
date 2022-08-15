import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { SvgIcon, Avatar } from '@ui';
import { UiStoreContext } from '@store';

import { Story } from '@c/Stories';
import st from './Stories.module.scss';

const stories = [
  {
    id: 1,
    img: '/img/stories-1.jpg',
    img2x: '/img/stories-1@2x.jpg',
    title: 'Если затеяли ремонт в доме',
    imgPosition: 'center right',
  },
];
const Stories = observer(({ className }) => {
  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <section className={cns(st.container, className)}>
        <div className="container">
          {stories && stories.map((story) => <Story {...story} key={story.id} />)}
        </div>
      </section>
    </>
  );
});

export default Stories;
