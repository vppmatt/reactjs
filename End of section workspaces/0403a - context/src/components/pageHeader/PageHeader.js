import './pageHeader.css';
import Menu from "./Menu";
import {Link} from "react-router-dom";
import {UserContext} from "../context/Context";
import {useContext} from "react";

const PageHeader = () => {

    const userContext = useContext(UserContext);



    return (
        <div className="pageHeader">
            <h1><Link to="/">Payments Application</Link></h1>
            <Menu/>
            { userContext.id !== 0 &&  <p>Current user: {userContext.name} <button onClick={userContext.logout}>logout</button>  </p>}
        </div>
    );
}

export default PageHeader
