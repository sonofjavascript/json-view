<template>
  <HeaderBox />
  <MainBox />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { HeaderBox, MainBox } from "./components";

export default defineComponent({
  name: "App",
  components: {
    HeaderBox,
    MainBox,
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
  background-color: $primary;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  color: $secondary;

  main {
    flex: 1;
  }

  .disabled {
    background-color: $disabled;
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
