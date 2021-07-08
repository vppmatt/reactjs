import React from 'react'; //This line is no longer needed
import './Greeting.css';

class ClassGreetingExample extends React.Component {

    constructor(props) {
        super( props );
        this.state ={name: props.name, age : props.age};
    }

    render() {
        return (<div>
            <p className="greeting_text"> Hello {this.state.name}. You are {this.state.age} years old. </p>
        </div>);
    }

}

export default ClassGreetingExample;
