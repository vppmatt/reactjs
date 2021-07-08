import React from 'react'; //This line is no longer needed
import './Greeting.css';

const Greeting = (props) => {

    return (
        <div>
            <p className="greeting_text"> Hello {props.name}. You are {props.age} years old. </p>
        </div>
    );
}

export default Greeting;
