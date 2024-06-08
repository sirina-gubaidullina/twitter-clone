import { Window, WindowContent, TextInput } from "react95";
import classes from "./Search.module.css";

const Search = () => {
  return (
    <Window className={classes.search}>
      <WindowContent>
        <TextInput placeholder="Search Chirper" />
      </WindowContent>
    </Window>
  );
};

export default Search;
