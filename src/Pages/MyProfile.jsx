import { Window } from "react95";
import useHttp from "../hooks/use-http";
import { getAllPosts } from "../lib/api";

import Profile from "../components/Profile";
import ChirpList from "../components/ChirpList";
import { useEffect } from "react";
import Load from "../UI/Load";
import NoChirp from "../components/NoChirp";

const MyProfile = () => {
  const {
    sendRequest,
    status,
    data: loadedPosts,
    error,
  } = useHttp(getAllPosts, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (error) {
    return <Window className="window">{error}</Window>;
  }

  if (status === "completed" && (!loadedPosts || loadedPosts.length === 0)) {
    return (
      <Window className="window">
        <Profile />
        <NoChirp />
      </Window>
    );
  }

  return (
    <Window className="window">
      <Profile />
      {status === "pending" ? <Load /> : <ChirpList chirp={loadedPosts} />}
    </Window>
  );
};

export default MyProfile;
