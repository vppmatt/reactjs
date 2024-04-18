import './App.css';

import FindTransactionPage from "./components/FindTransactionPage/FindTransactionPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PageHeader from "./components/pageHeader/PageHeader";
import HomePage from "./components/HomePage/HomePage";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import AddTransactionPage from './components/AddTransactionPage/AddTransactionPage';
import { UserContext } from './context/Context';
import { useState } from 'react';
import Login from './components/Login';

function App() {

    const [user,setUser] = useState({id: 0, name : "", role : ""})

    const login = setUser;

    const logout = () => {
        setUser({id: 0, name : "", role : ""});
    }

    return (
        <UserContext.Provider value={{...user, login : login, logout : logout}}>
            <BrowserRouter>
                <PageHeader/>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/find/:orderId" element={<FindTransactionPage/>} />
                    <Route path="/find" element={<FindTransactionPage/>} />
                    <Route path="/add" element={<AddTransactionPage />} />
                    <Route path = "/" element={<HomePage />} />
                    <Route element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
