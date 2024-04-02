import axios from "axios";
import { useMemo } from "react";

import {
  LoggerProviderProps,
  defaultLoggerOptions,
  mapLevelToNumber,
} from "../logger.interface";
import { LoggerContext } from "../WebLoggerContext";

export const WebLoggerProvider = ({
  children,
  options,
  disable,
}: LoggerProviderProps) => {
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
      console.error("Failed to send message", payload, e);
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
    <LoggerContext.Provider
      value={{ alert, critical, error, warning, notice, info, debug }}
    >
      {children}
    </LoggerContext.Provider>
  );
};
