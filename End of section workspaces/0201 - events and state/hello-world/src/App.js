import './App.css';
import Greeting from './components/Greeting/Greeting'
import SongList from "./components/Songs/SongList";
import ClassGreetingExample from "./components/Greeting/ClassGreetingExample";

function App() {
  return (
    <div>
        <Greeting name="Matt" age="21"/>
        <ClassGreetingExample name="Sally" age="32"/>
        <SongList />
    </div>
  );
}

export default App;
