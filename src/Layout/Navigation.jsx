import { NavLink } from "react-router-dom";
import { MenuListItem, Button, Window } from "react95";
import classes from "./Navigation.module.css";
import Logo from "../assets/logo.png";

const Navigation = () => {
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
      <NavLink to="/new-chirp">
        <Button primary fullWidth={true} className={classes.chirp}>
          Chirp
        </Button>
      </NavLink>
    </Window>
  );
};

export default Navigation;
