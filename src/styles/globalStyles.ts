import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
    border: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.5s linear;
}
`;

export const lightTheme = {
  body: "#fff",
  text: "#363537",
};

export const darkTheme = {
  body: "#363537",
  text: "#fafafa",
};
