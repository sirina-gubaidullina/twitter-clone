import { NavLink } from "react-router-dom";
import {
  MenuListItem,
  Button,
  AppBar,
  MenuList,
  Separator,
  TextInput,
  Toolbar,
} from "react95";
import { useState } from "react";
import classes from "./Appbar.module.css";
import LogoWindows95 from "../assets/logo95.png";

const Appbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <AppBar position="fixed" className={classes["nav-bar"]}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <div
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          <Button
            onClick={() => setOpen(!open)}
            active={open}
            style={{ fontWeight: "bold" }}
          >
            <img
              src={LogoWindows95}
              alt="react95 logo"
              style={{ height: "20px", marginRight: 4 }}
            />
            Start
          </Button>
          {open && (
            <MenuList
              style={{
                position: "absolute",
                left: "0",
                bottom: "100%",
              }}
              onClick={() => setOpen(false)}
            >
              <MenuListItem>
                <NavLink to="/profile">
                  <span role="img" aria-label="👨‍💻">
                    👨‍💻
                  </span>
                  Profile
                </NavLink>
              </MenuListItem>
              <MenuListItem>
                <NavLink to="/new-chirp">
                  <span role="img" aria-label="🖌️">
                    🖌️
                  </span>
                  New Chirp
                </NavLink>
              </MenuListItem>
              <Separator />
              <MenuListItem disabled>
                <span role="img" aria-label="🔙">
                  🔙
                </span>
                Logout
              </MenuListItem>
            </MenuList>
          )}
        </div>

        <TextInput placeholder="Search Chirper" width={150} />
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
