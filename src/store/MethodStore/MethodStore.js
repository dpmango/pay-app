import { makeAutoObservable, runInAction } from 'mobx';
import { computedFn } from 'mobx-utils';
import Cookies from 'js-cookie';

import { AUTH_TOKEN_COOKIE } from '@core/enum/cookie';
import api from './method.api';

export default class MethodStore {
  methods = [];

  constructor() {
    makeAutoObservable(this);

    this.init();
  }

  get defaultMethod() {
    try {
      return this.methods.find((x) => x.isDefault);
    } catch {
      return null;
    }
  }

  get defaultMethodId() {
    try {
      return this.defaultMethod.id;
    } catch {
      return null;
    }
  }

  get availableMethods() {
    try {
      return this.methods.filter((x) => x.status === 'Available');
    } catch {
      return [];
    }
  }

  get attachedMethods() {
    try {
      return this.methods.filter((x) => x.status === 'Attached');
    } catch {
      return [];
    }
  }

  isAttachedMethod = computedFn((id) => {
    try {
      return this.methods.find((x) => x.id === id).status === 'Attached';
    } catch {
      return false;
    }
  });

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
    const [err, data, status] = await api.connectMethod(req);

    if (err) throw err;
    await this.getMethods();

    return { data, status };
  }
}
