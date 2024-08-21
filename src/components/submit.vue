<script lang="ts">
import { Address } from "@/types";
import Vue from "vue";
import { mapGetters } from "vuex";
export default Vue.extend({
  name: "SubmitComponent",
  computed: {
    ...mapGetters(["addresses", "isValidAddressHistory", "isValidSubmission"]),
  },
  methods: {
    submit() {
      // TODO: Trigger form submission using Vuex
      if (this.isValidSubmission) {
        this.$store.dispatch("submitForm");
      }
    },
  },
});
</script>
<template>
  <b-button @click="submit">Submit</b-button>
</template>
