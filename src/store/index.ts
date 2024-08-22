import Vue from "vue";
import Vuex from "vuex";
import { Address, Claim, State, User } from "@/types";
import { createClaim } from "@/core/createClaim";
Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: {
    user: null,
    addresses: [{ line1: "", postcode: "", dateMovedIn: "" }] as Address[],
    claims: [] as Claim[],
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
    resetAddress(state) {
      state.addresses = [{ line1: "", postcode: "", dateMovedIn: "" }];
    },
    setClaim(state, claims: Claim) {
      state.claims.push(claims);
    },
  },
  actions: {
    async createClaimAction(
      { commit },
      { userId, creationIpAddress, claimData }
    ) {
      try {
        const [newClaim, error] = await createClaim(
          userId,
          creationIpAddress,
          claimData
        );
        if (error) throw error;
        commit("setClaim", newClaim);
        return [newClaim, null];
      } catch (error) {
        return [null, error];
      }
    },
  },
  modules: {},
});
