import { Route, Switch, Redirect } from "react-router-dom";
import { useContext } from "react";

import MyProfile from "./Pages/MyProfile";
import ChirpDetail from "./Pages/ChirpDetail";
import NewChirp from "./Pages/NewChirp";
import NotFound from "./Pages/NotFound";
import Auth from "./Pages/Auth";
import AuthContext from "./store/auth-context";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/auth" />
      </Route>
      <Route path="/profile" exact>
        {authCtx.isLoggedIn && <MyProfile />}
        {!authCtx.isLoggedIn && <Auth />}
      </Route>
      <Route path="/profile/:postId">
        {authCtx.isLoggedIn && <ChirpDetail />}
        {!authCtx.isLoggedIn && <Auth />}
      </Route>
      <Route path="/new-chirp">
        {authCtx.isLoggedIn && <NewChirp />}
        {!authCtx.isLoggedIn && <Auth />}
      </Route>
      <Route path="/auth">
        {!authCtx.isLoggedIn && <Auth />}
        {authCtx.isLoggedIn && <MyProfile />}
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default App;
