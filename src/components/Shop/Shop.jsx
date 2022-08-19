import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { SvgIcon, Avatar } from '@ui';
import { UiStoreContext } from '@store';

import ShopCard from '@c/Shop/ShopCard';
import st from './Shop.module.scss';
import { purchases, shops } from './mockData';

const Shop = observer(({ tab, className }) => {
  const [pTab, setPTab] = useState(1);

  const uiContext = useContext(UiStoreContext);

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        {tab === 'purchases' && (
          <>
            <div className={st.tabs}>
              <div
                className={cns(st.tabsLink, pTab === 1 && st._active)}
                onClick={() => setPTab(1)}>
                Активные
              </div>
              <div
                className={cns(st.tabsLink, pTab === 2 && st._active)}
                onClick={() => setPTab(2)}>
                История
              </div>
            </div>

            <div className={st.grid}>
              {purchases &&
                purchases.map((card) => (
                  <ShopCard className={st.gridCard} {...card} key={card.id} />
                ))}
            </div>
          </>
        )}

        {tab === 'shops' && (
          <div className={st.grid}>
            {shops &&
              [...shops, ...shops].map((card) => (
                <ShopCard className={st.gridCard} isShopCard={true} {...card} key={card.id} />
              ))}
          </div>
        )}

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
  );
});

export default Shop;
