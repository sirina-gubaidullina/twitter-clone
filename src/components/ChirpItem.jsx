import { Link } from "react-router-dom";
import { WindowContent, Avatar, Separator } from "react95";
import classes from "./ChirpItem.module.css";
import ProfilePhoto from "../assets/Spider-man.jpg";
import { useState } from "react";
import Like from "../UI/Like";

const ChirpItem = (props) => {
  const like = Math.floor(Math.random() * 100);

  const [isAddinglike, setIsAddingLike] = useState(like);
  const [activeBtn, setActiveBtn] = useState(false);

  const addLikeHandler = () => {
    if (activeBtn === false) {
      setIsAddingLike(isAddinglike + 1);
      setActiveBtn(true);
    } else {
      setIsAddingLike(isAddinglike - 1);
      setActiveBtn(false);
    }
  };

  return (
    <>
      <WindowContent>
        <div className={classes.author}>
          <Avatar square="true" size={50} src={ProfilePhoto} />
          <div>
            <p>Spider Man</p>
            <p>{props.date}</p>
          </div>
        </div>
        <div className={classes.text}>
          <p>{props.text}</p>
          <div className={classes["like-button"]}>
            <button
              onClick={() => addLikeHandler(true)}
              className={classes.like}
            >
              <Like
                fill={
                  activeBtn === true ? "rgb(192, 35, 35)" : "rgb(19, 69, 113)"
                }
              />
            </button>
            {isAddinglike}
          </div>
        </div>
        <Link to={`/profile/${props.id}`} className="btn">
          More
        </Link>
      </WindowContent>
      <Separator />
    </>
  );
};

export default ChirpItem;
