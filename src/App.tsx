import { GlobalStyles, darkTheme, lightTheme } from "@styles/globalStyles";
import { AuthRouter, RouterWrap } from "@utils/routerUtils";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { history } from "@utils/historyUtils";
import { useMachine } from "@xstate/react";
import { authMachine } from "./machines";

function App() {
  const [theme, setTheme] = useState<string>("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const [authState] = useMachine(authMachine);

  return (
    <RouterWrap history={history}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        {authState.matches("unauthorized") && <AuthRouter />}
      </ThemeProvider>
    </RouterWrap>
  );
}

export default App;
