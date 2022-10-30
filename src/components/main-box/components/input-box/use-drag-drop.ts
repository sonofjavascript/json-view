import { ref, Ref, watch } from "vue";

function useDragAndDrop(
  elementRef: Ref<HTMLElement | null>
): Ref<string | null> {
  const fileContent = ref<string | null>(null);

  const listenEvents = (element: HTMLElement) => {
    element.ondrop = function (event) {
      const reader = new FileReader();
      reader.onloadend = function (readEvent) {
        fileContent.value =
          (readEvent.currentTarget as unknown as { result?: string }).result ||
          null;
      };

      const [file] = event?.dataTransfer?.files || [];
      if (!file) return;
      reader.readAsText(file);
      event.preventDefault();
    };
  };

  watch(elementRef, (element) => {
    if (!element) return;

    listenEvents(element);
  });

  return fileContent;
}

export default useDragAndDrop;
