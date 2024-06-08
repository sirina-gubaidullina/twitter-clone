import { WindowContent } from "react95";
import CommentItem from "./CommentItem";

const CommentList = (props) => {
  return (
    <WindowContent>
      {props.comments.map((comment) => (
        <CommentItem
          key={comment.id}
          author={comment.author}
          text={comment.text}
          date={comment.date}
        />
      ))}
    </WindowContent>
  );
};

export default CommentList;
