<template>
  <HeaderBox />
  <VisualizerBox />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { HeaderBox, VisualizerBox } from "./components";

export default defineComponent({
  name: "App",
  components: {
    HeaderBox,
    VisualizerBox,
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    flex: 1;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }
}
</style>
