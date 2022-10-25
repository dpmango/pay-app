import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import cns from 'classnames';

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
const Stories = ({ className }) => {
  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <Swiper spaceBetween={14} slidesPerView={'auto'}>
          {stories &&
            stories.map((story) => (
              <SwiperSlide key={story.id}>
                <Story {...story} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Stories;
