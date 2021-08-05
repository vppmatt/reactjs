import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <ul className="nav">
            <li><Link to="/find">Find a transaction</Link></li>
            <li><Link to="/add">Add a transaction</Link></li>
        </ul>
    );
}

export default Menu;