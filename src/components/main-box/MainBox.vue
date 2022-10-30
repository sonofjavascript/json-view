<script lang="ts">
import { defineComponent } from "vue";
import { InputBox, ViewBox } from "./components";

export default defineComponent({
  name: "MainBox",
  components: {
    InputBox,
    ViewBox,
  },
});
</script>

<template>
  <main>
    <section class="input-wrapper">
      <InputBox />
    </section>
    <section class="visualizer-wrapper disabled">
      <ViewBox />
    </section>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  padding: 24px;
  max-width: 1024px;
  width: 100%;

  > section {
    border-radius: 8px;
    flex: 1;
    padding: 16px;

    &:first-child {
      margin-right: 8px;
    }

    &:last-child {
      margin-left: 8px;
    }
  }

  .input-wrapper {
    border: 1px dashed $secondary;
    background-color: $primary-soft;

    textarea {
      height: 100%;
      width: 100%;
    }
  }

  .visualizer-wrapper {
    border: 1px solid white;
  }
}
</style>
