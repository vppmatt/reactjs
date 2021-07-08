import React from 'react'; //This line is no longer needed
import './Greeting.css';

const Greeting = ({name,age}) => {

    return (
        <div>
            <p className="greeting_text"> Hello {name}. You are {age} years old. </p>
        </div>
    );
}

export default Greeting;
