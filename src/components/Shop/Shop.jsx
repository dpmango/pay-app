import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { SvgIcon, Avatar } from '@ui';
import { UiStoreContext } from '@store';

import { Story } from '@c/Stories';
import ShopCard from '@c/Shop/ShopCard';
import st from './Shop.module.scss';
import { purchases } from './mockData';

const Shop = observer(({ className }) => {
  const [tab, setTab] = useState(1);

  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <section className={cns(st.container, className)}>
        <div className="container">
          <div className={st.tabs}>
            <div className={cns(st.tabsLink, tab === 1 && st._active)} onClick={() => setTab(1)}>
              Активные
            </div>
            <div className={cns(st.tabsLink, tab === 2 && st._active)} onClick={() => setTab(2)}>
              История
            </div>
          </div>

          <div className={st.grid}>
            {purchases && purchases.map((card) => <ShopCard className={st.gridCard} {...card} key={card.id} />)}
          </div>

          <div className={st.fixedNav}>
            <div className={st.nav}>
              <NavLink to="/shops" className={st.navLink}>
                <SvgIcon name="shopping-cart" />
                <span>Магазины</span>
              </NavLink>

              <NavLink to="/" className={st.navLink}>
                <SvgIcon name="list" />
                <span>Покупки</span>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default Shop;
