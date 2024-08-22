<script lang="ts">
import { createClaim } from "@/core/createClaim";
import { getUserIpAddress } from "@/core/getUserIpAddress";
import { Address } from "@/types";
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
export default Vue.extend({
  name: "SubmitComponent",
  data() {
    return {
      errorMsg: "",
      successMsg: "",
      ipErrorMsg: ",",
    };
  },
  computed: {
    ...mapGetters(["user", "addresses", "isValidAddressHistory"]),
  },
  methods: {
    ...mapActions(["createClaimAction"]),
    clearForm() {
      this.$store.commit("resetAddress");
    },
    //Validate block - no empty "required" fields
    isValid(): boolean {
      return this.addresses.every(
        (address: Address) =>
          address.line1 && address.postcode && address.dateMovedIn
      );
    },
    async submit() {
      //Reset the error and success messages
      this.errorMsg = "";
      this.successMsg = "";
      this.ipErrorMsg = "";

      //Check for block validation - if unsuccessful, update error message
      if (!this.isValid()) {
        this.errorMsg = "Please fill in all required fields.";
        return;
      }

      try {
        //Define the parameters for the createClaim function
        const userId = this.user.id;
        const claimData = { addresses: this.addresses };
        const [creationIpAddress, ipErrorMsg] = await getUserIpAddress();
        //If unable to retrieve IP address, log the error but proceed with submitting the claim to not hinder the user's experience.
        //If IP address is required, a return can be placed in the if statement to prevent submission and an error message displayed for the user to try again.
        if (ipErrorMsg) {
          this.ipErrorMsg =
            "Unable to retrieve IP address. The claim will be submitted without it.";
        }

        const [newClaim, error] = await createClaim(
          userId,
          creationIpAddress || "IP not available",
          claimData
        );

        if (error) {
          this.errorMsg =
            "There was an error submitting your address history. Please try again.";
        } else {
          this.clearForm();
          this.successMsg =
            "Your address history has been submitted successfully!";
          return newClaim;
        }
      } catch (error) {
        this.errorMsg = "An unexpected error occurred. Please try again.";
      }
    },
  },
});
</script>
<template>
  <div>
    <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>
    <b-button
      @click="submit"
      variant="primary"
      :disabled="!isValidAddressHistory"
      >Submit</b-button
    >
    <p v-if="successMsg" class="text-success">{{ successMsg }}</p>
  </div>
</template>
