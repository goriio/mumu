import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --color-primary: #ff6b81;
    --color-bg: #ffffff;
    --color-fg: #f1f2f6;
    --color-text: #2f3542;
    --color-text-light: #57606f;

    --overlay: #0000003a;

    --box-shadow: #0000001a 0 0 5px 0, #0000001a 0 0 1px 0;

    --border-radius: 4px;
    --border-radius-large: 8px;

    --nav-height: 60px;
    --nav-lg-screen-width: 250px;
    --progress-bar-height: 4px;

    --speed: 200ms;

    --z-index-modal: 9000;
    --z-index-overlay: 8000;
    --z-index-dropdown: 7000;
    --z-index-header: 6000;
    --z-index-footer: 5000;

    font-family: 'Inter', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--color-bg);
    color: var(--color-text);
    line-height: 2;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
  }
`;
