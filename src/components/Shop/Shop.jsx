import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { SvgIcon, Avatar } from '@ui';
import { PayoutStoreContext } from '@store';

import ShopCard from '@c/Shop/ShopCard';
import st from './Shop.module.scss';
import { purchases, shops } from './mockData';

const Shop = observer(({ tab, className }) => {
  const [pTab, setPTab] = useState(1);
  const { t } = useTranslation('shop');

  const payoutContext = useContext(PayoutStoreContext);

  useEffect(() => {
    payoutContext.getPayouts({ completed: pTab === 2 });
  }, [pTab]);

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        {tab === 'purchases' && (
          <>
            <div className={st.tabs}>
              <div
                className={cns(st.tabsLink, pTab === 1 && st._active)}
                onClick={() => setPTab(1)}>
                {t('tabs.active')}
              </div>
              <div
                className={cns(st.tabsLink, pTab === 2 && st._active)}
                onClick={() => setPTab(2)}>
                {t('tabs.history')}
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
              <span>{t('nav.shops')}</span>
            </NavLink>

            <NavLink to="/" className={st.navLink}>
              <SvgIcon name="list" />
              <span>{t('nav.purchases')}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Shop;
