import { useHistory, useLocation } from "react-router-dom";
import { WindowContent, Tooltip, Button, Separator } from "react95";
import ChirpItem from "./ChirpItem";
import SortImg from "../assets/sort.png";
import { deleteSinglePost } from "../lib/api";
import useHttp from "../hooks/use-http";

const sortList = (post, ascending) => {
  return post.sort((postA, postB) => {
    if (ascending) {
      return postA.id > postB.id ? 1 : -1;
    } else {
      return postA.id < postB.id ? 1 : -1;
    }
  });
};

const ChirpList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { sendRequest, status } = useHttp(deleteSinglePost);

  useEffect(() => {
    if (status === "completed") {
      window.location.reload(true);
    }
  }, [status]);

  const deletePostHandler = (postData) => {
    sendRequest(postData);
  };

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get("sort") === "asc";

  const sortedPost = sortList(props.chirp, isSortingAscending);

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
  };

  return (
    <WindowContent>
      <Tooltip
        text={`Sort ${isSortingAscending ? "descending" : "ascending"}`}
        enterDelay={100}
        leaveDelay={500}
      >
        <Button
          style={{ marginBottom: "0.8rem" }}
          onClick={changeSortingHandler}
        >
          <img style={{ width: 23 }} src={SortImg} />
        </Button>
      </Tooltip>
      <Separator />
      {sortedPost.map((post) => (
        <ChirpItem
          key={post.id}
          id={post.id}
          text={post.text}
          date={post.date}
          onDelete={deletePostHandler}
        />
      ))}
    </WindowContent>
  );
};

export default ChirpList;
