import { useRef, useState } from "react";
import { Window, WindowContent, Avatar, TextInput, Button } from "react95";
import ProfilePhoto from "../assets/Spider-man.jpg";
import classes from "./Chirpform.module.css";
import Load from "../UI/Load";
import EmojiPicker from "emoji-picker-react";
import EmojiImg from "../assets/smile.png";

const ChirpForm = (props) => {
  const [addEmoji, setAddEmoji] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const textInputRef = useRef();

  const formattedDate = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const onEmojiClick = (emojiObject) => {
    setAddEmoji((prevInput) => prevInput + emojiObject.emoji);
  };

  const showEmojiHandler = () => {
    setShowEmoji(!showEmoji);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredText = textInputRef.current.value;
    props.onAddPost({ text: enteredText, date: formattedDate });
  };

  return (
    <Window className="window">
      <WindowContent>
        <form onSubmit={submitFormHandler}>
          <h2>Add post</h2>
          <div className={classes.title}>
            <Avatar src={ProfilePhoto} square="true" size={100} />
            <p>Spider Man</p>
          </div>
          {props.isLoading && <Load />}
          <TextInput
            ref={textInputRef}
            placeholder="What's happening?"
            fullWidth="true"
            maxLength="200"
            className={classes.input}
            multiline="true"
            value={addEmoji}
            onChange={(e) => setAddEmoji(e.target.value)}
          />
          <div className={classes.post}>
            <div>
              <Button onClick={showEmojiHandler}>
                <img src={EmojiImg} style={{ width: 23 }} />
              </Button>
              {showEmoji && (
                <EmojiPicker
                  style={{ position: "absolute", zIndex: 10 }}
                  emojiStyle="twitter"
                  onEmojiClick={onEmojiClick}
                />
              )}
            </div>
            <div className={classes.add}>
              <h3>200</h3>
              <Button type="submit" primary className={classes["add-post"]}>
                Chirp
              </Button>
            </div>
          </div>
        </form>
      </WindowContent>
    </Window>
  );
};

export default ChirpForm;
