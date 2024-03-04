import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 20px;
  --font-size-xl: 40px;

  --color-stone-0: #fff;
  --color-stone-50: #f8fafc;
  --color-stone-200: #e3e8ef;
  --color-stone-400: #97a3b6;
  --color-stone-800: #070a19;

  --color-green-200: #a0ecb1;
  --color-green-500: #32d657;

  --color-new-200: #f5e8d5;
  --color-new-500: #e9a23b;

  --color-yellow-200: #f5d565;
  --color-yellow-500: #e9a23b;

  --color-red-200: #f7d4d3;
  --color-red-500: #dd524c;

  --color-blue-500: #3662e3;

  --line-h-m: 1.4;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a:link,
a:visited,
a:hover,
a:active {
  color: inherit;
  text-decoration: none;
}


button,
input {
  color: inherit;
  font: inherit;
  border: none;
  background: none;
  outline: none;
}

button {
  cursor: pointer;
}

textarea {
  color: inherit;
  font: inherit;
  border: none;
  background: none;
  outline: none;
  resize: none;
}

ol,
ul,
li {
  list-style: none
}

body {
  color: var(--color-stone-800);
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  line-height: 1;
}

#root {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 56px auto;
}
`;

export default GlobalStyles;
