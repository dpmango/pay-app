import { makeAutoObservable, runInAction } from 'mobx';
import api from './payout.api';

export default class PayoutStore {
  payouts = [];
  payout = {};
  documents = [];
  sbpList = [];

  constructor() {
    makeAutoObservable(this);
  }

  // getters
  get selectedPlan() {
    try {
      return this.payout.availablePlans.find((x) => x.isDefault);
    } catch {
      return null;
    }
  }

  get selectedPlanId() {
    try {
      return this.selectedPlan.id;
    } catch {
      return null;
    }
  }

  get closestPaymentSum() {
    try {
      if (this.payout.status === 'Active') {
        return this.payout.plannedRedemptions[0].sum;
      } else {
        let planKey = this.payout.sumPaid > 0 ? 'periodicalSum' : 'firstSum';

        return this.selectedPlan[planKey];
      }
    } catch {
      return null;
    }
  }

  get payoutSumLeft() {
    return this.payout.sum - this.payout.sumPaid;
  }

  // inner actions
  setPayouts(payload) {
    runInAction(() => {
      this.payouts = [...payload];
    });
  }

  setPayout(payload) {
    runInAction(() => {
      this.payout = { ...this.payout, ...payload };
    });
  }

  setDocuments(payload) {
    runInAction(() => {
      this.documents = [...payload];
    });
  }

  updateDocument(payload) {
    runInAction(() => {
      this.documents = [...this.documents.map((x) => (x.id === payload.id ? { ...payload } : x))];
    });
  }

  setSBPList(payload) {
    console.log(payload);
    runInAction(() => {
      this.sbpList = [...payload];
    });
  }

  // api actions
  async getPayouts(req) {
    const [err, data] = await api.payouts(req);

    if (err) throw err;
    this.setPayouts(data);

    return data;
  }

  async getPayout(id, setStore = true) {
    const [err, data] = await api.payoutById(id);

    if (err) throw err;
    if (setStore) this.setPayout(data);

    return data;
  }

  async getPayoutDocument(id) {
    const [err, data] = await api.payoutDocument(id);

    if (err) throw err;
    this.setPayout({ document: data });

    return data;
  }

  async getPayoutPdf(id) {
    const [err, data] = await api.payoutDocumentPdf(id);

    if (err) throw err;
    // this.setPayout({ document: data });

    return data;
  }

  async acceptPayout(req) {
    const [err, data] = await api.acceptPayout(req);

    if (err) throw err;

    return data;
  }

  async rejectPayout(req) {
    const [err, data] = await api.rejectPayout(req);

    if (err) throw err;

    return data;
  }

  async getAttachedDocuments(id) {
    const [err, data] = await api.attachedDocuments(id);

    if (err) throw err;
    this.setDocuments(data);

    return data;
  }

  async getAttachedDocument(req) {
    const [err, data] = await api.attachedDocumentById(req);

    if (err) throw err;
    this.updateDocument(data);

    return data;
  }

  async uploadDocument(req) {
    const [err, data, status] = await api.uploadDocument(req);

    if (err) throw err;

    if (status === 204) {
      await this.getAttachedDocuments(req.id);
    }

    return data;
  }

  async deleteDocument(req) {
    const [err, data] = await api.deleteDocument(req);

    if (err) throw err;

    return data;
  }

  async initPayment(req) {
    const [err, data, status] = await api.initPayment(req);

    if (err) throw err;

    return { data, status };
  }
}
