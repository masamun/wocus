// 拡張メソッドの定義
declare global {
  interface Date {
    toStringYMD(): string;
    toStringMD(): string;
    toStringYM(): string;
    toDateWithTimezone(): Date;
  }
}
Date.prototype.toStringYMD = function () {
  return this.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
Date.prototype.toStringMD = function () {
  return this.toLocaleDateString("ja-JP", {
    month: "2-digit",
    day: "2-digit",
  });
};
Date.prototype.toStringYM = function () {
  return this.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
  });
};
// サーバー(Prisma)はUTCで扱うのでローカルのタイムゾーンの差分を補正したDateを返す
Date.prototype.toDateWithTimezone = function () {
  return new Date(this.getTime() - this.getTimezoneOffset() * 60 * 1000);
};
export {};
