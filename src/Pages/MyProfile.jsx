import { Window } from "react95";
import useHttp from "../hooks/use-http";
import { getAllPosts } from "../lib/api";

import Profile from "../components/Profile";
import ChirpList from "../components/ChirpList";
import { useEffect } from "react";
import Load from "../UI/Load";
import NoChirp from "../components/NoChirp";
import Layout from "../Layout/Layout";

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
    return (
      <Layout>
        <Window className="window">{error}</Window>;
      </Layout>
    );
  }

  if (status === "completed" && (!loadedPosts || loadedPosts.length === 0)) {
    return (
      <Layout>
        <Window className="window">
          <Profile />
          <NoChirp />
        </Window>
      </Layout>
    );
  }

  return (
    <Layout>
      <Window className="window">
        <Profile />
        {status === "pending" ? <Load /> : <ChirpList chirp={loadedPosts} />}
      </Window>
    </Layout>
  );
};

export default MyProfile;
