import { Fragment } from "react";
import { styleReset } from "react95";
import original from "react95/dist/themes/original";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";
import Navigation from "./Navigation";
import Search from "./Search";
import classes from "./Layout.module.css";
import Appbar from "./Appbar";

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'ms_sans_serif-bold';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
`;

const Layout = (props) => {
  return (
    <Fragment>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <main className={classes.components}>
          <Navigation />
          <div className="window">{props.children}</div>
          <Appbar />
          <Search />
        </main>
      </ThemeProvider>
    </Fragment>
  );
};

export default Layout;
