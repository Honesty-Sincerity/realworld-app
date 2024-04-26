import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.5s linear;
}
`;

export const lightTheme = {
  body: "#fffeff",
  text: "#0f0e11",
  cardColor: "#124e85",
};

export const darkTheme = {
  body: "#363537",
  text: "#fafafa",
  cardColor: "#124e85",
};
