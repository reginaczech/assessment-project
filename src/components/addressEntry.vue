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
    ...mapGetters(["addresses", "needMoreAddresses"]),
  },
  methods: {
    addEntry() {
      const nextAddress = { line1: "", postcode: "", dateMovedIn: "" };
      this.$store.commit("addAddress", nextAddress);
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
      />
      <InputComponent
        type="text"
        v-model="address.postcode"
        label="Postcode"
        name="postcode"
      />
      <InputComponent
        type="date"
        v-model="address.dateMovedIn"
        label="Date Moved In"
        name="dateMovedIn"
      />
    </div>
    <b-button @click="addEntry" v-if="needMoreAddresses">Add Address</b-button>
  </b-container>
</template>
