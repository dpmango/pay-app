import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { SvgIcon, Avatar, Tile } from '@ui';
import { UiStoreContext } from '@store';

import st from './Contacts.module.scss';

const Contacts = observer(({ className }) => {
  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <section className={cns(st.container, className)}>
        <div className="container">
          <div className={st.title}>Связаться с нами</div>
          <div className={st.grid}>
            <a href="tel:+78004504534">
              <Tile
                title="+7 (800) 450-45-34"
                description="Телефон"
                icon="phone"
                clickable={true}
                className={st.gridCard}
              />
            </a>
            <a href="mailto:alex@mail.ru">
              <Tile
                title="alex@mail.ru"
                description="Эл. почта"
                icon="email"
                clickable={true}
                className={st.gridCard}
              />
            </a>
            <a href="https://whatsapp.com/" target="_blank" rel="noreferrer">
              <Tile
                title="Написать в WhatsApp"
                icon="social-whatsapp"
                isSocial={true}
                clickable={true}
                className={st.gridCard}
              />
            </a>
            <a href="https://t.me/" target="_blank" rel="noreferrer">
              <Tile
                title="Написать в Telegram"
                icon="social-telegram"
                isSocial={true}
                clickable={true}
                className={st.gridCard}
              />
            </a>
          </div>
        </div>
      </section>
    </>
  );
});

export default Contacts;
