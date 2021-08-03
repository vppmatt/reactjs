import './App.css';
import Greeting from './components/Greeting/Greeting';
import SongList from "./components/SongList/SongList";

function App() {
  return (
    <div>
      <h2>Welcome to the system</h2>
        <Greeting greetingName="Matt" age="21" />
      <p>Here's another one</p>
        <Greeting greetingName="Hatef" age="22" />
        <SongList songName="Bohemian Rhapsody" songArtist ="Queen" />
    </div>
  );
}

export default App;
