import { WindowContent, Avatar, Button, Separator } from "react95";
import ProfilePhoto from "../assets/Spider-man.jpg";
import classes from "./Profile.module.css";
import LocationImg from "../assets/location.png";
import JoinedImg from "../assets/calendar.png";

const Profile = () => {
  return (
    <WindowContent className={classes.profile}>
      <div className={classes["profile-content"]}>
        <h2>Profile</h2>
        <div className={classes.avatar}>
          <Avatar square size={150} src={ProfilePhoto}></Avatar>
          <Button>Edit Profile</Button>
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
  );
};

export default Profile;
