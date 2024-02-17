export type LogLevel = "debug" | "info" | "warn" | "error";

interface CustomLogger {
  logLevel: LogLevel;
  debug(...data: any[]): void;
  error(...data: any[]): void;
  info(...data: any[]): void;
  warn(...data: any[]): void;
}

const appConfig = useAppConfig();

export const logger: CustomLogger = {
  logLevel: appConfig.logLevel as LogLevel,
  /** [MDN Reference]: (https://developer.mozilla.org/docs/Web/API/console/debug) */
  debug: (...data: any[]) => {
    console.debug(data);
  },
  /** [MDN Reference]: (https://developer.mozilla.org/docs/Web/API/console/info) */
  info: (...data: any[]) => {
    console.info(data);
  },
  /** [MDN Reference]: (https://developer.mozilla.org/docs/Web/API/console/warn) */
  warn: (...data: any[]) => {
    console.warn(data);
  },
  /** [MDN Reference]: (https://developer.mozilla.org/docs/Web/API/console/error) */
  error: (...data: any[]) => {
    console.error(data);
  },
};
