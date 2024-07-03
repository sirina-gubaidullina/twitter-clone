import { useState, useRef, useContext } from "react";
import {
  WindowContent,
  Avatar,
  Button,
  Window,
  TextInput,
  WindowHeader,
} from "react95";
import ProfilePhoto from "../assets/Spider-man.jpg";
import Cancel from "../assets/cancel.png";
import classes from "./Profile.module.css";
import LocationImg from "../assets/location.png";
import JoinedImg from "../assets/calendar.png";
import AuthContext from "../store/auth-context";
import Load from "../UI/Load";

const Profile = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    setIsLoading(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=[key]",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Сannot change the password";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setCartIsShown(false);
      })
      .catch((err) => {
        alert(err.message);
        setCartIsShown(false);
      });
  };

  return (
    <>
      <WindowContent className={classes.profile}>
        <div className={classes["profile-content"]}>
          <h2>Profile</h2>
          <div className={classes.avatar}>
            <Avatar square size={150} src={ProfilePhoto}></Avatar>
            <div className={classes["profile-buttons"]}>
              <Button disabled>Edit Profile</Button>
              <Button onClick={showCartHandler}>Change Password</Button>
            </div>
          </div>
          <div className={classes.description}>
            <p className={classes.name}>Spider Man</p>
            <p className={classes.username}>@spider_man_95</p>
            <p>
              Webbed my way through the bustling streets of NYC, thwarting
              villains 🕸️💥
            </p>
            <div className={classes.location}>
              <img style={{ width: 19 }} src={LocationImg} />
              <p>New York City, USA</p>
            </div>
            <div className={classes.location}>
              <img style={{ width: 19 }} src={JoinedImg} />
              <p>Joined July 2001</p>
            </div>
          </div>
        </div>
      </WindowContent>
      {cartIsShown && (
        <Window
          style={{
            width: "20rem",
            padding: "5px",
            position: "absolute",
            zIndex: "10",
          }}
          className={classes.modal}
        >
          <WindowHeader className={classes.header}>
            <span>change-password.exe</span>
            <Button onClick={hideCartHandler}>
              <img src={Cancel} style={{ width: "15px" }} />
            </Button>
          </WindowHeader>
          <form className={classes.form}>
            <label htmlFor="new-password">New Password</label>
            <TextInput
              type="password"
              id="new-password"
              minLength="7"
              ref={newPasswordInputRef}
            />
            {!isLoading && (
              <Button type="button" onClick={submitHandler}>
                OK
              </Button>
            )}
            {isLoading && <Load />}
          </form>
        </Window>
      )}
    </>
  );
};

export default Profile;
