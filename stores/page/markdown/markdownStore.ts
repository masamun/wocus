import markdownit from "markdown-it";

export type MarkdownShowEditor = "text" | "preview" | "both";

export const useMarkdownStore = defineStore("markdown", () => {
  const { pageId, pageType } = storeToRefs(usePageBridgeStore());

  const md = markdownit();
  const showEditor = ref<MarkdownShowEditor>("text");
  const text = ref("");
  const preview = ref("");
  let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;

  const fetchAll = async () => {
    // TODO
  };

  const clear = () => {
    text.value = "";
    preview.value = "";
  };

  const render = () => {
    preview.value = md.render(text.value);
  };

  const visible = computed(() => {
    console.info(`visible markdown ${pageType.value === "markdown"}`);
    return pageType.value === "markdown";
  });

  watch(text, () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      render();
      timeoutId = undefined;
    }, 100);
  });

  watch(
    pageId,
    () => {
      clear();
      if (visible && pageId.value !== undefined) {
        fetchAll().catch(() => {});
      }
    },
    {
      immediate: true,
    }
  );

  return {
    pageId,
    text,
    preview: readonly(preview),
    showEditor,
  };
});
