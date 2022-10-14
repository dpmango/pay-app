import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { SvgIcon } from '@ui';
import { Avatar } from '@c/Atom';

import st from './Chat.module.scss';

const Chat = observer(({ className }) => {
  const { t } = useTranslation('chat');

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.user}>
          <div className={st.userAvatar}>
            <Avatar img="/img/avatar.svg" />
          </div>
          <div className={st.userContent}>
            <div className={st.userName}>{t('admin.title')}</div>
            <div className={cns(st.userStatus, st._online)}>{t('admin.offline')}</div>
          </div>
        </div>

        <div className={st.scroller}>
          <div className={cns(st.message, st._in)}>
            <div className={st.messageWrapper}>
              <div className={st.messageText}>Сейчас поможем 🥰</div>
              <div className={st.messageMeta}>{t('admin.meta')}</div>
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
          <textarea rows="1" placeholder={t('submit.placeholder')}></textarea>
          <button type="submit">
            <SvgIcon name="send" />
          </button>
        </div>
      </div>
    </section>
  );
});

export default Chat;
