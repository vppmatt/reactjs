import './Greeting.css';
import PropTypes from 'prop-types';
const Greeting = ({name,age}) => {

    return (
        <div>
            <p className="greeting_text"> Hello {name}. You are {age} years old. </p>
        </div>
    );
}

Greeting.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
};


export default Greeting;
