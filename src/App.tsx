import { SignInForm } from "@features/ui";
import { GlobalStyles, darkTheme, lightTheme } from "@styles/globalStyles";
import { useState } from "react";
import { ThemeProvider } from "styled-components";

function App() {
  const [theme, setTheme] = useState<string>("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <SignInForm />
    </ThemeProvider>
  );
}

export default App;
