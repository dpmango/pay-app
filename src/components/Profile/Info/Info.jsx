import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { SvgIcon, Avatar, Tile } from '@ui';
import { UiStoreContext } from '@store';

import st from './Info.module.scss';

const Info = observer(({ className }) => {
  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <section className={cns(st.container, className)}>
        <div className="container">
          <div className={st.head}>
            <Avatar name="АС" variant="big" />
            <div className={st.title}>
              Здравствуйте, <br />
              Александр!
            </div>
          </div>

          <div className={st.grid}>
            <Tile title="+7 (954) 450-45-34" description="Мобильный телефон" icon="phone" className={st.gridCard} />
            <Tile title="alex@mail.ru" description="Эл. почта" icon="email" className={st.gridCard} />
            <Tile
              title="Карта Visa *8644"
              description="Способ оплаты"
              image="/img/payment/visa.png"
              className={st.gridCard}
            />
          </div>
        </div>
      </section>
    </>
  );
});

export default Info;
