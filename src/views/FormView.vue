<script lang="ts">
import Vue from "vue";
import FormComponent from "@/components/form.vue";
import TextComponent from "@/components/text.vue";
import SubmitComponent from "@/components/submit.vue";
import AddressEntryComponent from "@/components/addressEntry.vue";
import { mapGetters } from "vuex";
import { User } from "@/types";
export default Vue.extend({
  name: "FormView",
  components: {
    FormComponent,
    TextComponent,
    SubmitComponent,
    AddressEntryComponent,
  },
  computed: {
    ...(mapGetters(["user", "isValidAddressHistory"]) as {
      user: () => User;
      isValidAddressHistory: () => boolean;
    }),
  },
});
</script>
<template>
  <div>
    <FormComponent>
      <template v-slot:title>
        <TextComponent
          :text="`Welcome Back ${user.firstName}`"
          type="h1"
          classes="text-primary"
        />
      </template>
      <template v-slot:subtitle>
        <TextComponent
          text="Please provide you address history for the past 3 years"
          type="h2"
          classes="text-secondary"
        />
      </template>
      <template v-slot:question>
        <AddressEntryComponent />
      </template>
      <!-- Disables button if last address in list is not greater than 3 years. -->
      <template v-slot:submit>
        <p v-if="!isValidAddressHistory" class="text-danger">
          The last address in your history must be at least 3 years old.
        </p>
        <SubmitComponent
          :isButtonDisabled="!isValidAddressHistory"
          isFormSubmission
        />
      </template>
    </FormComponent>
  </div>
</template>
