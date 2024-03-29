import { WebLoggerProvider } from "lib";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div>
    <WebLoggerProvider>
      <h1>Hello React</h1>
    </WebLoggerProvider>
  </div>
);
