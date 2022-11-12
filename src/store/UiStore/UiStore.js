import { makeAutoObservable, runInAction } from 'mobx';
import api from './ui.api';

export default class UiStore {
  prevModal = null;
  activeModal = null;
  modalParams = null;

  constructor() {
    makeAutoObservable(this);
  }

  // assuming only one modal at given time
  setModal(name, params) {
    const timeoutms = this.prevModal ? 300 : 0;

    setTimeout(() => {
      runInAction(() => {
        this.prevModal = this.activeModal;
        this.activeModal = name;
        if (params) {
          this.modalParams = { ...params };
        } else {
          this.modalParams = null;
        }
      });
    }, timeoutms);
  }

  resetModal() {
    this.prevModal = this.activeModal;
    this.activeModal = null;
    this.modalParams = null;
  }

  resetModalParams() {
    this.modalParams = null;
  }

  async getImage(req) {
    const [err, data] = await api.getImage(req);

    if (err) throw err;

    return data;
  }
}
