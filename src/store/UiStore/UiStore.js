import { makeAutoObservable, runInAction } from 'mobx';
import { LOCAL_STORAGE_DEV_SECTIONS } from '@config/localStorage';

export default class UiStore {
  pageLoaded = false;
  prevModal = null;
  activeModal = null;
  modalParams = null;
  hiddenComponents = [];

  constructor() {
    makeAutoObservable(this);

    if (localStorage.getItem(LOCAL_STORAGE_DEV_SECTIONS)) {
      this.hiddenComponents = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DEV_SECTIONS));
    }

    // this.updateParams(new URLSearchParams(window.location.search));
  }

  setHiddenComponents(name) {
    if (this.hiddenComponents.includes(name)) {
      this.hiddenComponents = [...this.hiddenComponents.filter((x) => x !== name)];
    } else {
      this.hiddenComponents = [...this.hiddenComponents, ...[name]];
    }

    localStorage.setItem(LOCAL_STORAGE_DEV_SECTIONS, JSON.stringify(this.hiddenComponents));
  }

  // assuming only one modal at given time
  setModal(name, params) {
    const timeoutms = this.prevModal ? 100 : 0;

    setTimeout(() => {
      this.prevModal = this.activeModal;
      this.activeModal = name;
      if (params) {
        this.modalParams = params;
      } else {
        this.modalParams = null;
      }
    }, timeoutms);
  }

  setPageLoaded(v) {
    if (v !== this.pageLoaded) {
      this.pageLoaded = v;
    }
  }

  resetModal() {
    this.prevModal = this.activeModal;
    this.activeModal = null;
    this.modalParams = null;
  }
}
