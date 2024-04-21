import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterWrap } from "@utils/routerUtils.tsx";
import { history } from "@utils/historyUtils.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterWrap history={history}>
    <App />
  </RouterWrap>
);
