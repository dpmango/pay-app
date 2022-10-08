import { makeAutoObservable, runInAction } from 'mobx';
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
    this.getMethods();
    // const accessToken = Cookies.get(AUTH_TOKEN_COOKIE);
    // const refreshToken = Cookies.get(AUTH_REFRESH_COOKIE);
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
