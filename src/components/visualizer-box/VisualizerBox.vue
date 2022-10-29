<template>
  <main>
    <section class="input-wrapper">
      <InputJSON />
    </section>
    <section>Visualize here</section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { InputJSON } from "./components";

export default defineComponent({
  name: "VisualizerBox",
  components: {
    InputJSON,
  },
});
</script>

<style scoped lang="scss">
main {
  display: flex;
  padding: 24px;

  > section {
    border: 1px solid #2c3e50;
    border-radius: 8px;
  }

  .input-wrapper {
    flex: 1;

    textarea {
      height: calc(100% - 32px);
      width: calc(100% - 32px);
    }
  }
}
</style>
