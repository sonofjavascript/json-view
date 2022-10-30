<script lang="ts">
import { useAction, useGetter } from "@/core/store";
import { defineComponent, ref, watch } from "vue";
import useDragAndDrop from "./use-drag-drop";
import { JSON } from "@/modules/json/types";

export default defineComponent({
  name: "InputJSON",
  setup() {
    const currentJson = ref<string>("");
    const inputRef = ref<HTMLElement | null>(null);
    const jsonFile = useDragAndDrop(inputRef);
    const json = useGetter<JSON>("json");
    const setJson = useAction<JSON>("setJson");

    watch(json, (formattedJson) => {
      currentJson.value = formattedJson;
    });

    const updateJson = (value: string | null) => {
      if (!value) return;

      let json;
      try {
        json = JSON.parse(
          value.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ')
        );
      } catch (error) {}

      setJson(json);
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
