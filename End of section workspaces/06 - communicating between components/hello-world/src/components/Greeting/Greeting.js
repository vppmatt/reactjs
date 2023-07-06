import {useState} from 'react';
import './Greeting.css';

const Greeting = ({name, age}) => {

    let [currentName, setCurrentName] = useState(name);

    const changeName = () => {
        name="james";
        console.log("button was clicked");
        setCurrentName("James");
    }

    return (
        <div>
            <p className="greeting_text"> Hello {currentName}. You are {age} years old. </p>
            <button onClick={changeName} >change my name</button>
        </div>
    );
}

export default Greeting;
