import React, { useContext, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { SvgIcon } from '@ui';

import st from './HeaderSimple.module.scss';

const Header = observer(({ className }) => {
  // const [menuOpened, setMenuOpened] = useState(false);

  return (
    <header className={cns(st.header, className)}>
      <div className="container">
        <div className={st.wrapper}>
          <div className={st.logo}>
            <SvgIcon name="logo" />
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
