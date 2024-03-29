import { ReactNode, createContext, useContext } from "react";

interface WebLoggerService {
  log: (message: string) => void;
}

export const WebLoggerContext = createContext<WebLoggerService | null>(null);

interface Props {
  children: ReactNode;
}
export const WebLoggerProvider = ({ children }: Props) => {
  const log = (message: string) => {
    console.log(message);
  };

  return (
    <WebLoggerContext.Provider value={{ log }}>
      <div className="logger-provider">{children}</div>
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
