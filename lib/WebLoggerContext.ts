import { createContext, useContext } from "react";
import { LoggerService } from "./logger.interface";

export const LoggerContext = createContext<LoggerService | null>(null);

export const useLogger = () => {
  const context = useContext(LoggerContext);

  if (context === null)
    throw new Error(
      "useLogger must be used within LoggerProvider component!"
    );

  return context;
};
