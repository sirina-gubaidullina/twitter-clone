import { WindowContent, Avatar } from "react95";
import classes from "./HighlightedChirp.module.css";
import ProfilePhoto from "../assets/Spider-man.jpg";
import { useState } from "react";
import Like from "../UI/Like";

const HighlightedChirp = (props) => {
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
    <WindowContent className={classes["selected-post"]}>
      <div className={classes["selected-post-name"]}>
        <Avatar src={ProfilePhoto} square="true" size={100} />
        <div>
          <p>Spider Man</p>
          <p>@famulan95</p>
          <p>{props.date}</p>
        </div>
      </div>
      <p>{props.text}</p>
      <div className={classes["like-button"]}>
        <button onClick={() => addLikeHandler(true)} className={classes.like}>
          <Like
            fill={activeBtn === true ? "rgb(192, 35, 35)" : "rgb(19, 69, 113)"}
          />
        </button>
        {isAddinglike}
      </div>
    </WindowContent>
  );
};

export default HighlightedChirp;
