import './pageHeader.css';
import Menu from "./Menu";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const PageHeader = () => {

    const user = useSelector(state => state.user.user);

    return (
        <div className="pageHeader">
            <h1><Link to="/">Payments Application</Link></h1>
            <Menu/>
            {user.name !== "" && <p>Current user: {user.name}</p>}
        </div>
    );
}

export default PageHeader
