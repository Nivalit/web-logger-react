import { useState } from "react";
import ReactDOM from "react-dom/client";
import { LoggerProvider, useLogger } from "../lib";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div>
    <LoggerProvider
      type="EXTERNAL"
      options={{
        host: "http://localhost:3000",
        logLevel: "WARNING",
        userContext: "user-01",
      }}
    >
      <ReactLogger />
    </LoggerProvider>
  </div>
);

/**
 * React Logger Function Component
 * Example of WebLoggerContext usage
 * @returns
 */
function ReactLogger() {
  const logger = useLogger();
  const [logLevel, setLogLevel] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const sendLog = () => {
    const op = getOperation(logLevel);
    if (op) {
      //Depending on the logLevel trigger given method
      op(message);
      setMessage("");
    }
  };

  // Method that shows how to sent exceptions to logger
  const sendException = () => {
    try {
      throw new Error("Invalid property");
    } catch (e: unknown) {
      if (e instanceof Error) {
        logger.error(e.message, e.stack);
      }
    }
  };

  // Factory method to return valid logger method
  const getOperation = (level: string) => {
    switch (level) {
      case "1":
        return logger.alert;
      case "2":
        return logger.critical;
      case "3":
        return logger.error;
      case "4":
        return logger.warning;
      case "5":
        return logger.notice;
      case "6":
        return logger.info;
      case "7":
        return logger.debug;
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="log-level-input">Level</label>
        <select
          id="log-level-input"
          onChange={(v) => setLogLevel(v.currentTarget.value)}
          value={logLevel}
        >
          <option value="1">Alert</option>
          <option value="2">Critical</option>
          <option value="3">Error</option>
          <option value="4">Warning</option>
          <option value="5">Notice</option>
          <option value="6">Info</option>
          <option value="7">Debug</option>
        </select>
      </div>
      <div>
        <label htmlFor="log-message-input">Message</label>
        <input
          placeholder="Type you log message"
          id="log-message-input"
          value={message}
          onChange={(v) => setMessage(v.currentTarget.value)}
        />
      </div>
      <button onClick={sendLog}>Send log</button>
      <button onClick={sendException}>Send exception</button>
    </div>
  );
}
