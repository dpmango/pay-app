import React, { useContext, useState, useCallback, useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import styles from './Footer.module.scss';

const Footer = observer(({ className }) => {
  return (
    <footer className={cns(styles.footer, className)}>
      <div className="container">
        <div className={styles.copy}>
          Built with <strong>Pride</strong> in the Cayman Islands
        </div>
      </div>
    </footer>
  );
});

export default Footer;
