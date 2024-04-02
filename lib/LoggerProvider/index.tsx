import { LoggerProviderProps } from "../logger.interface";

import { WebLoggerProvider } from "./WebLoggerProvider";
import { ConsoleLoggerProvider } from "./ConsoleLoggerProvider";

type LoggerType = "CONSOLE" | "EXTERNAL";

interface LoggerFactoryProviderProps extends LoggerProviderProps {
  type?: LoggerType;
}
function LoggerProvider({
  type = "CONSOLE",
  ...props
}: LoggerFactoryProviderProps) {
  switch (type) {
    case "CONSOLE":
      return <ConsoleLoggerProvider {...props} />;
    case "EXTERNAL":
      return <WebLoggerProvider {...props} />;
  }
}

export default LoggerProvider;
