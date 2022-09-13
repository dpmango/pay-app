import { makeAutoObservable, runInAction } from 'mobx';
import Cookies from 'js-cookie';

import { AUTH_TOKEN_COOKIE } from '@config/cookie';
import service from './api-service';

export default class SessionStore {
  token = null;
  phone = null;
  profile = {};

  constructor() {
    makeAutoObservable(this);

    this.init();
  }
  // inner actions
  setSession(newSession) {
    const { token } = newSession;

    runInAction(() => {
      this.token = token;
      Cookies.set(AUTH_TOKEN_COOKIE, token);
    });
  }

  setPhone(phone) {
    this.phone = phone;
  }

  setProfile(profile) {
    this.profile = {
      ...this.profile,
      ...profile,
    };
  }

  async init() {
    const token = Cookies.get(AUTH_TOKEN_COOKIE);

    if (token) {
      await this.aliveSession({ token });
    } else {
      // await this.createSession();
    }
  }

  async createSession() {
    // localStorage.removeItem(LOCAL_STORAGE_SESSION);
    const [err, data] = await service.create();

    if (err) throw err;

    const { token } = data;

    this.setSession({ token });

    return data;
  }

  async aliveSession(req) {
    // const [err, result] = await service.alive(req);

    // if (err) throw err;
    this.setSession(req);

    // return result;
  }

  async logout() {
    this.token = null;
    this.phone = null;
    Cookies.remove(AUTH_TOKEN_COOKIE);
  }
}
