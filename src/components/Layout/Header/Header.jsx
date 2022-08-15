import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { SvgIcon, Avatar } from '@ui';
import { UiStoreContext } from '@store';

import st from './Header.module.scss';

const Header = observer(({ className }) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <header className={cns(st.header, className)}>
        <div className="container">
          <div className={st.wrapper}>
            <div className={st.pagename}>Покупки</div>

            <Link to="/profile" className={st.user}>
              <Avatar name="АС" />
              <span className={st.userName}>Александр</span>
            </Link>

            <Link to="/contacts" className={st.chat}>
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
    </>
  );
});

export default Header;
