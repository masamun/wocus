export const useDropDownMenu = () => {
  let enabled = false;

  // ドロップダウンが複数開かないようにする
  const current = useState("dropDownMenuHash", () => "");

  /**
   * ドロップダウンメニューを開く
   */
  const show = (hash: string) => {
    if (!enabled) {
      document.addEventListener("keypress", handleEvent);
      document.addEventListener("click", handleEvent);
      enabled = true;
    }
    current.value = hash;
  };

  /**
   * ドロップダウンメニューを閉じる
   */
  const hide = () => {
    document.removeEventListener("keypress", handleEvent);
    document.removeEventListener("click", handleEvent);
    current.value = "";
    enabled = false;
  };
  const handleEvent = () => {
    hide();
  };

  return {
    current: readonly(current),
    show,
  };
};
