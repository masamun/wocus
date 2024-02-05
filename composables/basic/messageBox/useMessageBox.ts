import MessageBoxConfirm from "@/components/basis/messageBox/MessageBoxConfirm.vue";
import MessageBoxPrompt from "@/components/basis/messageBox/MessageBoxPrompt.vue";

/**
 * MessageBoxを使う側が渡すcomposables関数用の引数
 */
export interface MessageBoxParams {
  title: string;
  text: string;
}

import { createVNode, render } from "vue";

type vNodeValue = ReturnType<typeof createVNode> | undefined;
type Components = typeof MessageBoxConfirm | typeof MessageBoxPrompt;

export const useMessageBox = () => {
  const destroy = (container: HTMLDivElement) => {
    render(null, container);
    container.remove();
  };

  /**
   * メッセージボックスを作成する
   * @param component
   * @param params
   * @returns
   */
  const create = <T>(component: Components, params: MessageBoxParams) => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    return new Promise<T>((resolve, reject) => {
      let vnode: vNodeValue = createVNode(component, {
        ...params,
        ...{
          onOk: (value: T) => {
            resolve(value);
            destroy(container);
            vnode = undefined;
          },
          onCancel: () => {
            reject();
            destroy(container);
            vnode = undefined;
          },
        },
      });
      render(vnode, container);
    });
  };
  /**
   * MessageBoxを開く(confirm)
   */
  const confirm = (params: MessageBoxParams) => {
    return create<boolean>(MessageBoxConfirm, params);
  };

  /**
   * MessageBoxを開く(prompt)
   */
  const prompt = (params: MessageBoxParams) => {
    return create<string>(MessageBoxPrompt, params);
  };

  return {
    confirm,
    prompt,
  };
};
