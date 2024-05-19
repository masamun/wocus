interface TextLineInfo {
  line: string;
  lineCount: string;
  style: { [index: string]: string };
}

export const useTextAreaLineCounter = (element: Ref<HTMLTextAreaElement | null>, text: Ref<string>) => {
  const textLines = ref<TextLineInfo[]>([]);
  const tmpTextArea = document.createElement("textarea");
  let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;

  const resizeObserver = new ResizeObserver(() => {
    calcTextLineCount();
  });

  const setDefault = () => {
    textLines.value = [
      {
        line: "",
        lineCount: "1",
        style: {},
      },
    ];
  };

  const createDiv = () => {
    const div = document.createElement("div");

    div.style.visibility = "hidden";
    div.style.position = "absolute";
    div.style.bottom = "0";

    return div;
  };

  const createNode = (target: HTMLTextAreaElement) => {
    const cloneNode = target.cloneNode(false) as typeof target;
    cloneNode.classList.remove("flex-grow");
    cloneNode.style.width = target.offsetWidth.toString() + "px";

    return cloneNode;
  };

  const calc = (
    currentLineCount: number,
    line: string,
    node: HTMLTextAreaElement,
    lineHeight: number,
    padding: number,
  ) => {
    // 1行分の情報を保持するテキストエリアを作成して高さを計算する
    // フォントの高さとレンダリング後の高さを判定する
    node.value = line;
    const actualLineHeight = node.scrollHeight - padding;
    const lineCount = Math.ceil(actualLineHeight / lineHeight);

    return [...Array(lineCount)].map((_, index): TextLineInfo => {
      if (index === 0) {
        return {
          line,
          lineCount: currentLineCount.toString(),
          style: {},
        };
      }
      else {
        return {
          line: "",
          lineCount: "-",
          style: { color: "transparent" },
        };
      }
    });
  };

  /**
   * テキストの各行が折り返し込みで何行で表示されているかを計算する
   */
  const calcTextLineCount = () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      calcTextLineCountMain();
      timeoutId = undefined;
    }, 100);
  };

  const calcTextLineCountMain = () => {
    if (!element.value) {
      setDefault();
      return;
    }
    if (text.value === "") {
      setDefault();
      return;
    }

    const div = createDiv();
    const node = createNode(element.value);

    try {
      document.body.appendChild(div);
      div.appendChild(node);

      // 行数の計算に必要なスタイル情報
      const styles = window.getComputedStyle(node);
      const paddingTop = parseInt(styles.paddingTop);
      const paddingBottom = parseInt(styles.paddingBottom);
      const lineHeight = parseInt(styles.lineHeight);

      textLines.value = text.value
        .split("\n")
        .map((line, index) => {
          return calc(index + 1, line, node, lineHeight, paddingTop + paddingBottom);
        })
        .flat();
    }
    finally {
      node.remove();
      div.remove();
    }
  };

  watch(text, () => {
    calcTextLineCount();
  });

  onMounted(() => {
    setDefault();
    if (!element.value) {
      return;
    }

    resizeObserver.observe(element.value);

    const styles = window.getComputedStyle(element.value);

    // textareaのスタイルをspanにコピー
    for (let i = 0; ; i++) {
      const propertyName = styles.item(i);
      if (propertyName === "") {
        break;
      }

      const value = styles.getPropertyValue(propertyName);
      tmpTextArea.style.setProperty(propertyName, value);
    }
  });

  onUnmounted(() => {
    tmpTextArea.remove();
    resizeObserver.disconnect();
  });

  return {
    textLines,
  };
};
