import { GlobalStyles, darkTheme, lightTheme } from "@styles/global.styled";
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
    </ThemeProvider>
  );
}

export default App;
