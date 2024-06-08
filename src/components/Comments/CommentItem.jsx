import { WindowContent, Avatar } from "react95";
import classes from "./CommentItem.module.css";
import GuestAvatar from "../../assets/guest.jpg";
const CommentItem = (props) => {
  return (
    <WindowContent>
      <div className={classes.author}>
        <Avatar square="true" size={50} src={GuestAvatar} />
        <p>{props.author}</p>
        <p>{props.date}</p>
      </div>
      <p>{props.text}</p>
    </WindowContent>
  );
};

export default CommentItem;
