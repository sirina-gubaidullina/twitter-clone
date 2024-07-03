import { useHistory } from "react-router-dom";

import ChirpForm from "../components/ChirpForm";
import useHttp from "../hooks/use-http";
import { addPost } from "../lib/api";
import { useEffect } from "react";
import Layout from "../Layout/Layout";

const NewChirp = () => {
  const { sendRequest, status } = useHttp(addPost);

  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/profile");
    }
  }, [status, history]);

  const addPostHandler = (postData) => {
    sendRequest(postData);
  };

  return (
    <Layout>
      <ChirpForm isLoading={status === "pending"} onAddPost={addPostHandler} />
    </Layout>
  );
};

export default NewChirp;
