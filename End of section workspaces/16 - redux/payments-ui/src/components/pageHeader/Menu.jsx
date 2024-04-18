import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from "../../store/store";

const Menu = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const userLogin = () => {
        dispatch(login({name: "Matt", role: "admin"}));
    }

    const userLogout = () => {
        dispatch(logout());
    }

    return (
        <ul className="nav">
            <li><Link to="/find">Find a transaction</Link></li>
            <li><Link to="/add">New transaction</Link></li>
            <li>
                {user.name === "" && <button onClick={userLogin}>Log in</button>}
                {user.name !== "" && <button onClick={userLogout}>Log out</button>}
            </li>
        </ul>
    );
}

export default Menu;
