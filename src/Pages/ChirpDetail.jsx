import { Window, WindowContent } from "react95";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comment from "../components/Comments/Comment";
import HighlightedChirp from "../components/HighlightedChirp";
import useHttp from "../hooks/use-http";
import { getSinglePost } from "../lib/api";
import { useEffect } from "react";
import Load from "../UI/Load";

const ChirpDetail = () => {
  const match = useRouteMatch();
  const params = useParams();

  const { postId } = params;

  const {
    sendRequest,
    status,
    data: loadedPosts,
    error,
  } = useHttp(getSinglePost, true);

  useEffect(() => {
    sendRequest(postId);
  }, [sendRequest, postId]);

  if (status === "pending") {
    return (
      <Window className="window">
        <Load />
      </Window>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!loadedPosts.text) {
    return <Window className="window">No chirp found</Window>;
  }

  return (
    <Window className="window">
      <HighlightedChirp text={loadedPosts.text} date={loadedPosts.date} />
      <Route path={match.path} exact>
        <WindowContent>
          <Link to={`${match.url}/comments`} className="btn">
            Load comments
          </Link>
        </WindowContent>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comment />
      </Route>
    </Window>
  );
};

export default ChirpDetail;
