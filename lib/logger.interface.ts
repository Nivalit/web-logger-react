import { ReactNode } from "react"

type LogLevel =
  | "ALERT"
  | "CRITICAL"
  | "ERROR"
  | "WARNING"
  | "NOTICE"
  | "INFO"
  | "DEBUG"

export interface LoggerOptions {
  /**
   * WebLogger host with protocol and port number
   * for example: https://logger.acme.com:9000
   */
  host: string
  /**
   * LogLevel Threshold. Select the lowest log level
   * that sould be sent to WebLogger service
   */
  logLevel: LogLevel
  /**
   * User Context - additional property to add context of active
   * user session for all logs send.
   */
  userContext?: string
}

export function mapLevelToNumber(logLevel: LogLevel): number {
  switch (logLevel) {
    case 'ALERT': return 1
    case 'CRITICAL': return 2
    case 'ERROR': return 3
    case 'WARNING': return 4
    case 'NOTICE': return 5
    case 'INFO': return 6
    case 'DEBUG': return 7
  }
}

export const defaultLoggerOptions: LoggerOptions = {
  host: "http://localhost:3003",
  logLevel: "INFO",
};

export interface LoggerService {
  alert: (message: string) => void;
  critical: (message: string) => void;
  error: (message: string, stackTrace?: string) => void;
  warning: (message: string) => void;
  notice: (message: string) => void;
  info: (message: string) => void;
  debug: (message: string) => void;
}

export interface LoggerProviderProps {
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