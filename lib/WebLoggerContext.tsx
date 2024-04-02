import axios from "axios";
import { ReactNode, createContext, useContext, useMemo } from "react";
import {
  LoggerOptions,
  defaultLoggerOptions,
  mapLevelToNumber,
} from "./logger.interface";

interface WebLoggerService {
  alert: (message: string) => void;
  critical: (message: string) => void;
  error: (message: string, stackTrace?: string) => void;
  warning: (message: string) => void;
  notice: (message: string) => void;
  info: (message: string) => void;
  debug: (message: string) => void;
}

export const WebLoggerContext = createContext<WebLoggerService | null>(null);

interface Props {
  children: ReactNode;
  /**
   * Options to setup connection with log server
   */
  options?: Partial<LoggerOptions>;
  /**
   * Disable Web Logger service and do not send any message to log server
   */
  disable?: boolean;
}
export const WebLoggerProvider = ({ children, options, disable }: Props) => {
  const axiosInstance = useMemo(() => {
    const axiosOptions = {
      ...defaultLoggerOptions,
      ...options,
    };
    return axios.create({
      baseURL: `${axiosOptions.host}`,
    });
  }, [options]);

  const sendMessage = async (
    message: string,
    level: number,
    stackTrace?: string
  ) => {
    if (disable) return;
    if (isFilteredLevel(level)) return;

    const payload = {
      message: message,
      level: level,
      stackTrace,
      userId: options?.userContext,
    };
    try {
      await axiosInstance.post("/gelf", payload);
    } catch (e) {
      console.error(e);
    }
  };

  const isFilteredLevel = (level: number): boolean => {
    const logLevelThreshold = mapLevelToNumber(
      options?.logLevel || defaultLoggerOptions.logLevel
    );
    return level > logLevelThreshold;
  };

  const alert = (message: string) => {
    sendMessage(message, 1);
  };
  const critical = (message: string) => {
    sendMessage(message, 2);
  };
  const error = (message: string, stackTrace?: string) => {
    sendMessage(message, 3, stackTrace);
  };
  const warning = (message: string) => {
    sendMessage(message, 4);
  };
  const notice = (message: string) => {
    sendMessage(message, 5);
  };
  const info = (message: string) => {
    sendMessage(message, 6);
  };
  const debug = (message: string) => {
    sendMessage(message, 7);
  };

  return (
    <WebLoggerContext.Provider
      value={{ alert, critical, error, warning, notice, info, debug }}
    >
      {children}
    </WebLoggerContext.Provider>
  );
};

export const useWebLoggerContext = () => {
  const context = useContext(WebLoggerContext);

  if (context === null)
    throw new Error(
      "useWebLoggerContext must be used within WebLoggerProvider component!"
    );

  return context;
};
