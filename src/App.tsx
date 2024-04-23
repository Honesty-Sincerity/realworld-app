import { SignInForm } from "@features/ui";
import { GlobalStyles, darkTheme, lightTheme } from "@styles/globalStyles";
import { RouterWrap } from "@utils/routerUtils";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { history } from "@utils/historyUtils";

function App() {
  const [theme, setTheme] = useState<string>("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <RouterWrap history={history}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <SignInForm />
      </ThemeProvider>
    </RouterWrap>
  );
}

export default App;
