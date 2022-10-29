<template>
  <textarea v-model="json" placeholder="Input your JSON" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import JSONFormatter from "json-formatter-js";

export default defineComponent({
  name: "InputJSON",
  setup() {
    const json = ref<string>("");

    watch(json, (jsonContent) => {
      const formatter = new JSONFormatter(jsonContent);

      console.log(formatter.render());
    });

    return {
      json,
    };
  },
});
</script>

<style scoped lang="scss">
textarea {
  padding: 16px;
}
</style>
