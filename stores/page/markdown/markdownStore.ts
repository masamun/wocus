import markdownit from "markdown-it";
import {
  GetMarkdownDocument,
  UpdateMarkdownDocument,
  type MutationUpdateMarkdownArgs,
  type QueryMarkdownArgs,
} from "~/client/graphql/types/graphql";

export type MarkdownShowEditor = "text" | "preview" | "both";

export const useMarkdownStore = defineStore("markdown", () => {
  const { pageId, pageType } = storeToRefs(usePageBridgeStore());

  const md = markdownit();
  const showEditor = ref<MarkdownShowEditor>("text");
  const text = ref("");
  const preview = ref("");
  let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;
  let saveTimeoutId: ReturnType<typeof setTimeout> | undefined = undefined;

  const fetchAll = async () => {
    if (pageId.value === undefined) {
      text.value = "";
      return;
    }

    const variables: QueryMarkdownArgs = {
      param: {
        markdownId: pageId.value,
      },
    };
    const { data } = await useAsyncQuery({
      query: GetMarkdownDocument,
      variables: variables,
      cache: false,
    });
    text.value = data.value?.markdown?.text ?? "";
  };

  const preSave = async () => {
    if (saveTimeoutId !== undefined) {
      clearTimeout(saveTimeoutId);
    }
    if (!visible.value) {
      return;
    }
    saveTimeoutId = setTimeout(() => {
      save();
      saveTimeoutId = undefined;
    }, 1000);
  };

  const save = async () => {
    if (pageId.value === undefined) {
      return;
    }
    const variables: MutationUpdateMarkdownArgs = {
      param: {
        markdownId: pageId.value,
        text: text.value,
      },
    };
    await useAsyncQuery({
      query: UpdateMarkdownDocument,
      variables: variables,
      cache: false,
    });
  };

  const clear = () => {
    text.value = "";
    preview.value = "";
  };

  const render = () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      preview.value = md.render(text.value);
      timeoutId = undefined;
    }, 100);
  };

  const visible = computed(() => {
    console.info(`visible markdown ${pageType.value === "markdown"}`);
    return pageType.value === "markdown";
  });

  watch(text, (value, oldValut) => {
    if (value === oldValut) {
      return;
    }
    render();
    preSave();
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
    },
  );

  return {
    pageId,
    text,
    preview: readonly(preview),
    showEditor,
  };
});
