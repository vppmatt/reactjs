import { useState } from 'react';
import './Greeting.css';
import PropTypes from 'prop-types';

const Greeting = (props) => {

    const [currentName, setCurrentName] = useState(name);

    const changeName = () => {
        console.log("button was clicked");
        setCurrentName("James");
    }

    return (
        <div>
            <p className="greeting_text"> Hello {currentName}. You are {props.age} years old. </p>
            <button onClick={changeName} >change my name</button>
        </div>
    );
}

Greeting.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
};


export default Greeting;
