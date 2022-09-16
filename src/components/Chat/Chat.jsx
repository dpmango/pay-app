import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { SvgIcon, Avatar, Tile } from '@ui';
import { UiStoreContext } from '@store';

import st from './Chat.module.scss';

const Chat = observer(({ className }) => {
  const uiContext = useContext(UiStoreContext);

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.user}>
          <div className={st.userAvatar}>
            <Avatar img="/img/avatar.svg" />
          </div>
          <div className={st.userContent}>
            <div className={st.userName}>Оператор</div>
            <div className={cns(st.userStatus, st._online)}>Онлайн</div>
          </div>
        </div>

        <div className={st.scroller}>
          <div className={cns(st.message, st._in)}>
            <div className={st.messageWrapper}>
              <div className={st.messageText}>Сейчас поможем 🥰</div>
              <div className={st.messageMeta}>Оператор поддержки</div>
            </div>
          </div>
          <div className={cns(st.message, st._out)}>
            <div className={st.messageWrapper}>
              <div className={st.messageText}>У меня проблемы с привязкой карты</div>
              <div className={st.messageMeta}>Александр 12.03.22 14.55</div>
            </div>
          </div>
        </div>

        <div className={st.create}>
          <textarea rows="1" placeholder="Текст сообщения"></textarea>
          <button type="submit">
            <SvgIcon name="send" />
          </button>
        </div>
      </div>
    </section>
  );
});

export default Chat;
