import {UserContext} from "../context/Context";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const login = () => {
        //call to REST would be here
        userContext.login({id:1,name : "Matt", role: "admin"});
        navigate("/");
    }

    return (<p>
        This is where the login form would go
        <button onClick={login}>login</button>
    </p>)
}

export default Login;