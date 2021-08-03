import './Greeting.css';
import {useState} from 'react';

const Greeting = (props) => {

    // const someVariable = useState("matt");
    // const myName = someVariable[0];
    // const setMyName = someVariable[0];

    const [myName, setMyName] = useState("matt");
    const [greeting, setGreeting] = useState("Hello again");

    const changeName = () => {
        console.log("Change name function is running.");
        setMyName("Jim");

        setGreeting("Are you still here? ");
    };

    return(<div>
        <p>Hello {props.greetingName}, You are {props.age} years old.</p>

        <p className="greetingPara">{greeting} {myName}.</p>

        <button onClick={changeName}  >Change my name</button>

    </div>);
};

export default Greeting;