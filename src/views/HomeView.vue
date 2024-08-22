<script lang="ts">
import Vue from "vue";
import FormComponent from "@/components/form.vue";
import TextComponent from "@/components/text.vue";
import InputComponent from "@/components/input.vue";
import SubmitComponent from "@/components/submit.vue";
export default Vue.extend({
  name: "HomeView",
  components: {
    FormComponent,
    TextComponent,
    InputComponent,
    SubmitComponent,
  },
  data() {
    return {
      userId: "",
      error: "",
    };
  },
  methods: {
    submitUserId() {
      if (this.userId.trim()) {
        //Navigate to the FormView via the /:userId route.
        this.$router.push({ path: `${this.userId}` });
      } else {
        this.error = "User does not exist, please try again";
      }
    },
  },
});
</script>
<template>
  <div>
    <FormComponent>
      <template v-slot:title>
        <TextComponent
          :text="`Welcome to ClaimsGate`"
          type="h1"
          classes="text-primary"
        />
      </template>
      <template v-slot:subtitle>
        <TextComponent
          text="To continue to your onboarding form, please provide your User ID:"
          type="h6"
          classes="text-secondary"
        />
      </template>
      <template v-slot:question>
        <InputComponent
          type="text"
          v-model="userId"
          label="User ID"
          name="userId"
          :required="true"
        />
      </template>
      <template v-slot:submit>
        <p v-if="error" class="text-danger">
          {{ error }}
        </p>
        <SubmitComponent
          buttonText="Submit User ID"
          :isButtonDisabled="!userId"
          @click="submitUserId"
        />
      </template>
    </FormComponent>
    <p>
      If you do not have access to your User ID, please email
      support@claimsgate.co.uk
    </p>
  </div>
</template>
