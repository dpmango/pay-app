import { makeAutoObservable, runInAction } from 'mobx';
import Cookies from 'js-cookie';

import { AUTH_TOKEN_COOKIE, AUTH_REFRESH_COOKIE } from '@core/enum/cookie';
import api from './method.api';

export default class MethodStore {
  methods = [];

  constructor() {
    makeAutoObservable(this);

    this.init();
  }

  get defaultMethodId() {
    try {
      this.methods.find((x) => x.default).id;
    } catch {
      return null;
    }
  }

  // inner actions
  setMethods(payload) {
    runInAction(() => {
      this.methods = [...payload];
    });
  }

  async init() {
    const accessToken = Cookies.get(AUTH_TOKEN_COOKIE);
    if (accessToken) {
      this.getMethods();
    }
  }

  async getMethods() {
    const [err, data] = await api.methods();

    if (err) throw err;
    this.setMethods(data);

    return data;
  }

  async connectMethod(req) {
    const [err, data] = await api.connectMethod(req);

    if (err) throw err;

    return data;
  }
}
