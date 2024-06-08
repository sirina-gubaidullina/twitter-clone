import { useParams } from "react-router-dom";
import { WindowContent, Button } from "react95";
import { useCallback, useEffect, useState } from "react";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import CommentList from "./CommentList";
import Load from "../../UI/Load";

const Comment = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  const { postId } = params;

  useEffect(() => {
    sendRequest(postId);
  }, [postId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(postId);
  }, [sendRequest, postId]);

  let comments;

  if (status === "pending") {
    comments = <Load />;
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p>No comments were added yet</p>;
  }
  return (
    <WindowContent>
      {!isAddingComment && (
        <Button primary onClick={startAddCommentHandler}>
          Add Comment
        </Button>
      )}
      {isAddingComment && (
        <NewCommentForm postId={postId} onAddedComment={addedCommentHandler} />
      )}
      {comments}
    </WindowContent>
  );
};

export default Comment;
