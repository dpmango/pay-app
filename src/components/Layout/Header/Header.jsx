import React, { useContext, useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { SvgIcon, Button } from '@ui';
import { UiStoreContext } from '@store';

import styles from './Header.module.scss';
// import { ReactComponent as Logo } from '@assets/logo.svg';

const Header = observer(({ className }) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <header className={cns(styles.header, className)}>
        <div className="container">
          <div className={styles.wrapper}>
            <Link to="/" className={styles.logo}>
              {/* <Logo /> */}
            </Link>

            <div className={styles.hamburger}>
              <div className={cns('hamburger', menuOpened && 'is-active')} onClick={() => setMenuOpened(!menuOpened)}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
});

export default Header;
