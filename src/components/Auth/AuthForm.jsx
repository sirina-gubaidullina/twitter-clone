import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Window, TextInput, Button, WindowHeader } from "react95";
import { styleReset } from "react95";
import classes from "./AuthForm.module.css";
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Load from "../../UI/Load";
import AuthContext from "../../store/auth-context";

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

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[key]";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[key]";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        history.replace("/profile");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GlobalStyles />
        <ThemeProvider theme={original}>
          <Window className={classes.auth}>
            <WindowHeader>{isLogin ? "login.exe" : "sign-up.exe"}</WindowHeader>
            <form>
              <div>
                <label htmlFor="email">Your Email</label>
                <TextInput
                  type="email"
                  id="email"
                  required
                  ref={emailInputRef}
                />
              </div>
              <div>
                <label htmlFor="password">Your Password</label>
                <TextInput
                  type="password"
                  id="password"
                  required
                  ref={passwordInputRef}
                />
              </div>
              {!isLoading && (
                <div className={classes.buttons}>
                  <Button onClick={submitHandler} type="button" primary>
                    {isLogin ? "Login" : "Create Account"}
                  </Button>
                  <Button type="button" onClick={switchAuthModeHandler}>
                    {isLogin
                      ? "Create new account"
                      : "Login with existing account"}
                  </Button>
                </div>
              )}
              {isLoading && <Load />}
            </form>
          </Window>
        </ThemeProvider>
      </section>
    </>
  );
};

export default AuthForm;
