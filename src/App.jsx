import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./Layout/Layout";
import MyProfile from "./Pages/MyProfile";
import ChirpDetail from "./Pages/ChirpDetail";
import NewChirp from "./Pages/NewChirp";
import NotFound from "./Pages/NotFound";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/profile" />
        </Route>
        <Route path="/profile" exact>
          <MyProfile />
        </Route>
        <Route path="/profile/:postId">
          <ChirpDetail />
        </Route>
        <Route path="/new-chirp">
          <NewChirp />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
