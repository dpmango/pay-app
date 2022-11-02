import React, { useContext, useMemo, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { SvgIcon } from '@ui';
import { Avatar } from '@c/Atom';
import { SessionStoreContext } from '@store';

import st from './Header.module.scss';

const Header = observer(({ className }) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const sessionContext = useContext(SessionStoreContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('header');

  const showBack = useMemo(() => {
    return pathname !== '/';
  }, [pathname]);

  const pageName = useMemo(() => {
    if (pathname === '/') {
      return t('menu.home');
      // } else if (pathname.includes('shops')) {
      //   return t('menu.shops');
    } else if (pathname.includes('pay')) {
      return t('menu.pay');
    } else if (pathname.includes('profile')) {
      return t('menu.profile');
    } else if (pathname.includes('contacts')) {
      return t('menu.contacts');
    } else {
      return t('menu.back');
    }
  }, [pathname]);

  const handleBackClick = () => {
    navigate('/', { replace: true });
  };

  return (
    <header className={cns(st.header, className)}>
      <div className="container">
        <div className={st.wrapper}>
          <div className={cns(st.pagename, showBack && st._navigatable)} onClick={handleBackClick}>
            <SvgIcon name="arrow-left" />
            <span>{pageName}</span>
          </div>

          {sessionContext.displayName && (
            <Link to="/profile" className={st.user}>
              <Avatar name={sessionContext.shortName} />
              <span className={st.userName}>{sessionContext.displayName}</span>
            </Link>
          )}

          {/* MVP No chat */}
          <Link to="/contacts" className={st.chat}>
            <SvgIcon name="chat" />
            {/* <div className={st.chatCounter}>
              <span>2</span>
            </div> */}
          </Link>
        </div>
      </div>
    </header>
  );
});

export default Header;
