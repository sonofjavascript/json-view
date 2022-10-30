<script lang="ts">
import { useAction, useGetter } from "@/core/store";
import { defineComponent, ref, watch } from "vue";
import useDragAndDrop from "./use-drag-drop";
import type { JSON } from "@/modules/json/types";

export default defineComponent({
  name: "InputJSON",
  setup() {
    const currentJson = ref<string>("");
    const inputRef = ref<HTMLElement | null>(null);
    const jsonFile = useDragAndDrop(inputRef);
    const jsonFormatted = useGetter<JSON>("jsonFormatted");
    const setJson = useAction<JSON>("setJson");

    watch(jsonFormatted, (jsonFormatted) => {
      currentJson.value = jsonFormatted;
    });

    const updateJson = (value: string | null) => {
      if (!value) return;

      try {
        const json = JSON.parse(
          value.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ')
        );
        setJson(json);
      } catch (error) {}
    };

    watch(currentJson, updateJson);
    watch(jsonFile, updateJson);

    return {
      currentJson,
      inputRef,
    };
  },
});
</script>

<template>
  <textarea
    ref="inputRef"
    v-model="currentJson"
    placeholder="Drag and drop your file or input your json"
  />
</template>

<style scoped lang="scss">
textarea {
  border: none;
  padding: 0;
  background-color: transparent;
  color: $secondary;

  &::placeholder {
    color: $secondary;
  }

  &:focus {
    outline: none;
  }

  &.dragover {
    border-color: #000;
    color: #000;
  }
}
</style>
