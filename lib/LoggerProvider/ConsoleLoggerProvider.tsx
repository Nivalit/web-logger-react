import {
  LoggerProviderProps,
  defaultLoggerOptions,
  mapLevelToNumber,
} from "../logger.interface";
import { LoggerContext } from "../WebLoggerContext";

export const ConsoleLoggerProvider = ({
  children,
  options,
  disable,
}: LoggerProviderProps) => {
  const logMessage = async (
    method: (message: string, ...optionalParams: any[]) => void,
    message: string,
    level: number,
    stackTrace?: string
  ) => {
    if (disable) return;
    if (isFilteredLevel(level)) return;
    stackTrace ? method(message, stackTrace) : method(message);
  };

  const isFilteredLevel = (level: number): boolean => {
    const logLevelThreshold = mapLevelToNumber(
      options?.logLevel || defaultLoggerOptions.logLevel
    );
    return level > logLevelThreshold;
  };

  const alert = (message: string) => {
    logMessage(console.error, `[ALERT] - ${message}`, 1);
  };
  const critical = (message: string) => {
    logMessage(console.error, `[CRITICAL] - ${message}`, 2);
  };
  const error = (message: string, stackTrace?: string) => {
    logMessage(console.error, `[ERROR] - ${message}`, 3, stackTrace);
  };
  const warning = (message: string) => {
    logMessage(console.warn, `[WARNING] - ${message}`, 4);
  };
  const notice = (message: string) => {
    logMessage(console.info, `[NOTICE] - ${message}`, 5);
  };
  const info = (message: string) => {
    logMessage(console.info, `[INFO] - ${message}`, 6);
  };
  const debug = (message: string) => {
    logMessage(console.debug, `[DEBUG] - ${message}`, 7);
  };

  return (
    <LoggerContext.Provider
      value={{ alert, critical, error, warning, notice, info, debug }}
    >
      {children}
    </LoggerContext.Provider>
  );
};
