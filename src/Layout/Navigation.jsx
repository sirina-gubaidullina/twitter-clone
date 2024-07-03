import { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { MenuListItem, Button, Window } from "react95";
import classes from "./Navigation.module.css";
import Logo from "../assets/logo.png";
import AuthContext from "../store/auth-context";

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const LogoutHandler = () => {
    authCtx.logout();
    history.replace("/auth");
  };

  return (
    <Window className={classes.navigation}>
      <img src={Logo} className={classes.logo} />
      <MenuListItem disabled>Home</MenuListItem>
      <MenuListItem disabled>Explore</MenuListItem>
      <MenuListItem disabled>Notification</MenuListItem>
      <MenuListItem disabled>Messages</MenuListItem>
      <MenuListItem disabled>Bookmarks</MenuListItem>
      <MenuListItem>
        <NavLink to="/profile">Profile</NavLink>
      </MenuListItem>
      <MenuListItem disabled>More</MenuListItem>
      <MenuListItem>
        <NavLink onClick={LogoutHandler} to="/profile">
          Logout
        </NavLink>
      </MenuListItem>
      <NavLink to="/new-chirp">
        <Button primary fullWidth={true} className={classes.chirp}>
          Chirp
        </Button>
      </NavLink>
    </Window>
  );
};

export default Navigation;
