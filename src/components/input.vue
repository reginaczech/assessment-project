<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "InputComponent",
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator(value: string) {
        return ["text", "date"].includes(value);
      },
    },
    classes: {
      type: String,
      default: "",
    },
  },
});
</script>
<template>
  <div>
    <b-form-group :for="name">{{ label }}</b-form-group>
    <b-form-input
      :type="type"
      :value="value"
      @input="$emit('input', $event)"
      :class="[classes]"
    />
  </div>
</template>
