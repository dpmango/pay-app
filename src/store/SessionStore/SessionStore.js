import { makeAutoObservable, runInAction } from 'mobx';
import Cookies from 'js-cookie';

import { AUTH_TOKEN_COOKIE, AUTH_REFRESH_COOKIE } from '@core/enum/cookie';
import api from './session.api';

export default class SessionStore {
  accessToken = null;
  refreshToken = null;
  accessTokenLifetime = null;
  phone = null;
  confirmation = {
    confirmationToken: null,
    confirmationTimeout: null,
  };
  profile = {};

  constructor() {
    makeAutoObservable(this);

    this.init();
  }

  // inner actions
  setConfirmationSession(confirmationSession) {
    runInAction(() => {
      this.confirmation = { ...confirmationSession };
    });
  }

  setSession(newSession) {
    const { accessToken, refreshToken, accessTokenLifetime } = newSession;

    runInAction(() => {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.accessTokenLifetime = accessTokenLifetime;
      Cookies.set(AUTH_TOKEN_COOKIE, accessToken);
      Cookies.set(AUTH_REFRESH_COOKIE, refreshToken);
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
    const accessToken = Cookies.get(AUTH_TOKEN_COOKIE);
    const refreshToken = Cookies.get(AUTH_REFRESH_COOKIE);

    if (accessToken && refreshToken) {
      await this.renewSession({ refreshToken });
      await this.getProfile();
    } else {
      // await this.createSession();
    }
  }

  async createSession(req) {
    // send phone - get confirmation token
    const [err, data] = await api.create(req);

    if (err) throw err;

    const { confirmationToken, confirmationTimeout, retryTimeout } = data;

    this.setConfirmationSession({ confirmationToken, confirmationTimeout });
    this.setPhone(req.phone);

    return data;
  }

  async confirmSession({ code }) {
    // send sms confirmation - get access token
    const [err, data] = await api.confirm({
      confirmationCode: code,
      confirmationToken: this.confirmation.confirmationToken,
    });

    if (err) throw err;

    this.setSession(data);
    const [profileErr, profileData] = await this.getProfile();

    return data;
  }

  async renewSession(req) {
    const [err, data] = await api.renew(req);

    if (err) throw err;
    this.setSession(data);

    return data;
  }

  async getProfile(req) {
    const [err, data] = await api.profile(req);

    if (err) throw err;
    this.setProfile(data);

    return data;
  }

  async logout() {
    this.accessToken = null;
    this.refreshToken = null;
    this.accessTokenLifetime = null;
    this.phone = null;
    this.confirmation = {
      confirmationToken: null,
      confirmationTimeout: null,
    };
    this.profile = {};

    Cookies.remove(AUTH_TOKEN_COOKIE);
    Cookies.remove(AUTH_REFRESH_COOKIE);
  }
}
