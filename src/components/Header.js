import Headline from "./Headline";
import SearchBar from "./SearchBar";
import Dialog from "./Dialog";

export default function Header() {
  return (
    <div className="App-header">
      <div className="App-header-back">
        <Headline />
        <SearchBar />
      </div>
      <Dialog />
    </div>
  );
}
