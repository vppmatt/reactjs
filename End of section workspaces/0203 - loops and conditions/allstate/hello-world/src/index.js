import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//VERSION 1
// const p1 = React.createElement("p", {id: "para1"}, "This is paragraph 1");
// const p2 = React.createElement("p", {id: "para2"}, "This is paragraph 2");

// const unorderedList = React.createElement("ul", null, [
//     React.createElement("li",null,"first"),
//     React.createElement("li",null,"second"),
//     React.createElement("li",null,"third")
// ]);
//
// const div = React.createElement("div", null, [p1,p2,unorderedList]);

//VERSION 2 - using JSX
//
// const labelAndInput = <div>
//     <label htmlFor="myInput">My Input</label>
//     <input id="myInput" />
// </div>;
//
//     const myStyle = {"font-size": "20px", color: "#f00"};
//
//
// const div = <div>
//     <p id="para1">This is paragraph 1</p>
//     <p id="para2" style={{"font-size": "20px", color: "#f00"}} >This is paragraph 2</p>
//     {labelAndInput}
//     {labelAndInput}
//     <ul className="myList"  >
//         <li>first</li>
//         <li>second</li>
//     </ul>
// </div>;


//ReactDOM.render(div, document.getElementById("root"));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
