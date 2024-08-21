<script lang="ts">
import Vue from "vue";
import InputComponent from "@/components/input.vue";
import { mapGetters } from "vuex";
export default Vue.extend({
  name: "AddressEntryComponent",
  components: {
    InputComponent,
  },
  computed: {
    ...mapGetters(["addresses", "needMoreAddresses", "isValidAddressHistory"]),
  },
  methods: {
    addEntry() {
      const nextAddress = { line1: "", postcode: "", dateMovedIn: "" };
      this.$store.commit("addAddress", nextAddress);
    },
    removeEntry(index: number) {
      this.$store.commit("removeAddress", index);
    },
    updateAddress(
      index: number,
      address: { line1: string; postcode: string; dateMovedIn: string }
    ) {
      this.$store.commit("updateAddress", { index, address });
    },
  },
});
</script>
<template>
  <b-container>
    <div v-for="(address, index) in addresses" :key="index">
      <InputComponent
        type="text"
        v-model="address.line1"
        label="Address Line 1"
        name="line1"
        @input="updateAddress(index, { ...address, line1: $event })"
        :required="true"
      />
      <InputComponent
        type="text"
        v-model="address.postcode"
        label="Postcode"
        name="postcode"
        @input="updateAddress(index, { ...address, postcode: $event })"
        :required="true"
      />
      <InputComponent
        type="date"
        v-model="address.dateMovedIn"
        label="Date Moved In"
        name="dateMovedIn"
        @input="updateAddress(index, { ...address, dateMovedIn: $event })"
        :required="true"
      />
      <b-button @click="removeEntry(index)" v-if="addresses.length > 1"
        >Remove Address</b-button
      >
    </div>
    <b-button
      @click="addEntry"
      v-if="needMoreAddresses && !isValidAddressHistory"
      >Add Address</b-button
    >
  </b-container>
</template>
