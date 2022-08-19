import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

import { LOCAL_STORAGE_SESSION } from '@config/localStorage';
import service from './api-service';

export default class SessionStore {
  sessionId = null;
  sessionNumber = null;

  constructor() {
    makeAutoObservable(this);

    // this.init();
  }
  // inner actions
  setSession(newSession) {
    const { sessionId, sessionNumber } = newSession;

    runInAction(() => {
      this.sessionId = sessionId;
      this.sessionNumber = sessionNumber;

      localStorage.setItem(LOCAL_STORAGE_SESSION, JSON.stringify(newSession));
    });
  }

  // api actions
  /**
   @action init
   @description
    сперва пытаемся получить сессию из localStorage либо создаем новую
    делаем запрос на alive сессии
    при ошибках пересоздаем сессию
  **/
  async init() {
    // migration
    let useMigration = false;
    let sessionId = null;
    let sessionNumber = null;

    // ищет последнюю актуальную версию сессии. every позволяет выйти из цикла
    const versionsList = ['session_0.0.1'];
    versionsList.reverse().every((key) => {
      const lsSession = localStorage.getItem(key);
      if (lsSession) {
        const lsSessionObj = JSON.parse(lsSession);

        sessionId = lsSessionObj.sessionId;
        sessionNumber = lsSessionObj.sessionNumber;

        useMigration = true;

        return false;
      }

      return true;
    });

    // уже запомнили в переменную, очищаем старые версии
    versionsList.forEach((key) => {
      localStorage.removeItem(key);
    });

    if (localStorage.getItem(LOCAL_STORAGE_SESSION) || useMigration) {
      if (localStorage.getItem(LOCAL_STORAGE_SESSION)) {
        // даже если используются миграция, в приоритете данные из актуальной версии LS
        const lsSession = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSION));

        sessionId = lsSession.sessionId;
        sessionNumber = lsSession.sessionNumber;
      }

      runInAction(() => {
        this.sessionId = sessionId;
        this.sessionNumber = sessionNumber;
      });

      let newSessionOnErr = true;
      try {
        await this.aliveSession({ sessionId });
      } catch (err) {
        if (newSessionOnErr && err.response && [400, 404].includes(err.response.status)) {
          await this.createSession();
        }
      }
    } else {
      await this.createSession();
    }
  }

  async createSession() {
    // localStorage.removeItem(LOCAL_STORAGE_SESSION);
    const [err, data] = await service.create();

    if (err) throw err;

    const { sessionId, sessionNumber } = data;

    this.setSession({ sessionId, sessionNumber });

    return data;
  }

  async aliveSession(req) {
    const [err, result] = await service.alive(req);

    if (err) throw err;

    return result;
  }

  // multitab ls feature
  hydrateStore() {
    const lsSession = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSION));

    const { sessionId, sessionNumber } = lsSession;

    runInAction(() => {
      this.sessionId = sessionId;
      this.sessionNumber = sessionNumber;
    });

    localStorage.setItem(LOCAL_STORAGE_SESSION, localStorage.getItem(LOCAL_STORAGE_SESSION));
  }
}
