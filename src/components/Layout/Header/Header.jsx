import React, { useContext, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { SvgIcon, Avatar } from '@ui';
import { UiStoreContext } from '@store';

import st from './Header.module.scss';

const Header = observer(({ className }) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const uiContext = useContext(UiStoreContext);
  const { pathname } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const showBack = useMemo(() => {
    return pathname !== '/';
  }, [pathname]);

  const pageName = useMemo(() => {
    if (pathname === '/') {
      return 'Покупки';
    } else if (pathname.includes('shops')) {
      return 'Магазины';
    } else if (pathname.includes('pay')) {
      return 'Покупки';
    } else if (pathname.includes('profile')) {
      return 'Профиль';
    } else if (pathname.includes('contacts')) {
      return 'Контакты';
    } else {
      return 'Назад';
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

          <Link to="/profile" className={st.user}>
            <Avatar name="АС" />
            <span className={st.userName}>Александр</span>
          </Link>

          <Link to="/chat" className={st.chat}>
            <SvgIcon name="chat" />
            <div className={st.chatCounter}>
              <span>2</span>
            </div>
          </Link>

          {/* <div className={st.hamburger}>
              <div className={cns('hamburger', menuOpened && 'is-active')} onClick={() => setMenuOpened(!menuOpened)}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div> */}
        </div>
      </div>
    </header>
  );
});

export default Header;
