import { Link } from "react-router-dom";
import { WindowContent } from "react95";

const NoChirp = () => {
  return (
    <WindowContent>
      <h3>No chirps found</h3>
      <Link to="/new-chirp">Add a chirp</Link>
    </WindowContent>
  );
};

export default NoChirp;
