import Vue from "vue";
import Vuex from "vuex";
import { Address, State, User } from "@/types";

Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: {
    user: null,
    addresses: [{ line1: "", postcode: "", dateMovedIn: "" }] as Address[],
  },
  getters: {
    user(state): User | null {
      return state.user;
    },
    addresses(state): Address[] {
      return state.addresses;
    },
    needMoreAddresses(state): boolean {
      return state.addresses.length < 3;
    },
    isValidAddressHistory(state): boolean {
      if (state.addresses.length === 0) return false;

      const lastAddress = state.addresses[state.addresses.length - 1];
      const lastDate = new Date(lastAddress.dateMovedIn);
      const threeYearsAgo = new Date();
      threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
      return lastDate <= threeYearsAgo;
    },
  },
  mutations: {
    setUser(state, user: User) {
      state.user = user;
    },
    addAddress(state, address: Address) {
      state.addresses.push(address);
    },
    removeAddress(state, index: number) {
      state.addresses.splice(index, 1);
    },
    updateAddress(
      state,
      { index, address }: { index: number; address: Address }
    ) {
      Vue.set(state.addresses, index, address);
    },
  },
  actions: {},
  modules: {},
});
