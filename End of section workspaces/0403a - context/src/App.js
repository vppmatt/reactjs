import './App.css';

import FindTransactionPage from "./components/FindTransactionPage/FindTransactionPage";
import AddTransactionPage from "./components/AddTransactionPage/AddTransactionPage";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import PageHeader from "./components/pageHeader/PageHeader";
import HomePage from "./components/HomePage/HomePage";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import {createContext, useState} from "react";
import {UserContext} from "./components/context/Context";
import Login from "./components/Login";

function App() {

    const [user,setUser] = useState({id: 0, name : "", role : ""})

    const login = (newUser) => {
        //simulate getting a user from a remote source
        setUser(newUser);
    }

    const logout = () => {
        setUser({id: 0, name : "", role : ""});
    }

    return (
        <UserContext.Provider value={{...user, login : login, logout : logout}}>
        <BrowserRouter>
            <PageHeader/>
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/add">
                    <AddTransactionPage/>
                </Route>
                <Route path={["/find/:orderId", "/find"]}>
                    <FindTransactionPage/>
                </Route>
                <Route exact path = "/" >
                    <HomePage />
                </Route>
                <Route>
                    <PageNotFound />
                </Route>

            </Switch>
        </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
