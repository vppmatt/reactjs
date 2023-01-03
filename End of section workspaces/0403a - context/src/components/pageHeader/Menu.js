import {Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../context/Context";


const Menu = () => {

    const userContext = useContext(UserContext);

    return (
        <ul className="nav">
            <li><Link to="/find">Find a transaction</Link></li>
            <li><Link to="/add">New transaction</Link></li>
            {userContext.id === 0 && <li><Link to="/login">Log in</Link></li>}
        </ul>
    );
}

export default Menu;
