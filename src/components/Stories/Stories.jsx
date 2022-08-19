import React, { useContext, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { SvgIcon, Avatar } from '@ui';
import { UiStoreContext } from '@store';

import { Story } from '@c/Stories';
import st from './Stories.module.scss';
import 'swiper/css';

const stories = [
  {
    id: 1,
    img: '/img/stories-1.jpg',
    img2x: '/img/stories-1@2x.jpg',
    title: 'Если затеяли ремонт в доме',
    imgPosition: 'center right',
  },
  {
    id: 2,
    img: '/img/stories-1.jpg',
    img2x: '/img/stories-1@2x.jpg',
    title: '2 Если затеяли ремонт в доме',
    imgPosition: 'center right',
  },
];
const Stories = observer(({ className }) => {
  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <section className={cns(st.container, className)}>
        <Swiper spaceBetween={14} slidesPerView={'auto'}>
          {stories &&
            stories.map((story) => (
              <SwiperSlide key={story.id}>
                <Story {...story} />
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
    </>
  );
});

export default Stories;
