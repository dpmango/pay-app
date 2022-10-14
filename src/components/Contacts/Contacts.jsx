import React from 'react';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { Tile } from '@c/Atom';

import st from './Contacts.module.scss';

const Contacts = ({ className }) => {
  const { t } = useTranslation('contacts');

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.title}>{t('title')}</div>
        <div className={st.grid}>
          <a href="tel:+78004504534">
            <Tile
              title="+7 (800) 450-45-34"
              description={t('phone')}
              icon="phone"
              clickable={true}
              className={st.gridCard}
            />
          </a>
          <a href="mailto:alex@mail.ru">
            <Tile
              title="alex@mail.ru"
              description={t('email')}
              icon="email"
              clickable={true}
              className={st.gridCard}
            />
          </a>
          <a href="https://whatsapp.com/" target="_blank" rel="noreferrer">
            <Tile
              title={t('telegram')}
              icon="social-whatsapp"
              isSocial={true}
              clickable={true}
              className={st.gridCard}
            />
          </a>
          <a href="https://t.me/+QgJau0Vde6s0YTli" target="_blank" rel="noreferrer">
            <Tile
              title={t('whatsapp')}
              icon="social-telegram"
              isSocial={true}
              clickable={true}
              className={st.gridCard}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
