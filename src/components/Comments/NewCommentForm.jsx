import { useRef, useEffect } from "react";
import { WindowContent, TextInput, Avatar, Button } from "react95";
import classes from "./NewCommentForm.module.css";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import Load from "../../UI/Load";
import GuestAvatar from "../../assets/guest.jpg";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const commentAuthorRef = useRef();
  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;

  const formattedDate = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredText = commentTextRef.current.value;
    const enteredAuthor = commentAuthorRef.current.value;

    const formIsValid = enteredText && enteredAuthor;

    if (!formIsValid) {
      return;
    }

    sendRequest({
      commentData: {
        text: enteredText,
        author: enteredAuthor,
        date: formattedDate,
      },
      postId: props.postId,
    });
  };

  return (
    <WindowContent>
      <form className={classes} onSubmit={submitFormHandler}>
        {status === "pending" && <Load />}
        <div className={classes["comment-input"]}>
          <Avatar square="true" size={50} src={GuestAvatar} />
          <TextInput placeholder="Your name" ref={commentAuthorRef} />
        </div>
        <TextInput
          ref={commentTextRef}
          placeholder="Post your reply"
          fullWidth="true"
          multiline="true"
        />
        <Button primary type="submit">
          Add comment
        </Button>
      </form>
    </WindowContent>
  );
};

export default NewCommentForm;
