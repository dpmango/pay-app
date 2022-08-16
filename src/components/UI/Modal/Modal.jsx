import React, { useState, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import cns from 'classnames';

import { UiStoreContext } from '@store/UiStore';
import { SvgIcon } from '@ui';

import st from './Modal.module.scss';
import styles2 from './Modal.scss';

const sharedStyles = {
  content: {
    position: 'absolute',
    background: 'transparent',
    borderRadius: '0px',
    padding: 0,
    overflowY: 'auto',
    maxHeight: '100%',
    boxShadow: 'none',
  },
  overlay: {
    zIndex: 99,
    // background: 'rgba(0,0,0, 0.5)',
  },
};

const mainStyles = {
  content: {
    width: '100%',
    maxWidth: '100%',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: '0',
    margin: '0px auto',
  },
};

Modal.setAppElement('#root');

const Variants = {
  MAIN: 'main',
  // NARROW: 'narrow',
};

const VariantStyles = {
  [Variants.MAIN]: mainStyles,
  // [Variants.NARROW]: narrowStyles,
};

const VariantClasses = {
  [Variants.MAIN]: '',
  // [Variants.NARROW]: st._narrow,
};

const Modifiers = {
  DEFAULT: 'default',
  FULL: 'fullheight',
};

const ModifierClasses = {
  [Modifiers.DEFAULT]: null,
  [Modifiers.FULL]: st._full,
};

const ModalComponent = observer(({ variant, modifier, name, className, mobTitle, children }) => {
  const uiContext = useContext(UiStoreContext);

  const afterOpenModal = () => {};

  const closeModal = () => {
    uiContext.resetModal();
  };

  let CSSinJSstyles = sharedStyles;
  if (variant && VariantStyles[variant]) {
    CSSinJSstyles = {
      content: { ...CSSinJSstyles.content, ...VariantStyles[variant].content },
      overlay: { ...CSSinJSstyles.overlay, ...VariantStyles[variant].overlay },
    };
  }

  useEffect(() => {
    if (!uiContext.activeModal) {
      document.body.classList.remove('ReactModal__Body--open');
    }
  }, [uiContext.activeModal]);

  return (
    <Modal
      className={cns(`ReactModal__Content--${variant}`, modifier && `modifier-${modifier}`)}
      isOpen={uiContext.activeModal === name}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      closeTimeoutMS={300}
      style={CSSinJSstyles}
      preventScroll={true}
      contentLabel="Modal">
      <div
        className={cns(
          st.container,
          variant && VariantClasses[variant],
          modifier && ModifierClasses[modifier],
          className
        )}>
        <div className={cns('close', st.close)} onClick={closeModal}>
          {/* <SvgIcon name="close" /> */}
          <div className={st.closeLine}></div>
        </div>

        <div className={cns(st.content, modifier && ModifierClasses[modifier])}>{children}</div>
      </div>
    </Modal>
  );
});

ModalComponent.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  modifier: PropTypes.string,
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

ModalComponent.defaultProps = {
  variant: Variants.MAIN,
  modifier: Modifiers.DEFAULT,
};

export default ModalComponent;
