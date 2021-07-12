import './App.css';

import FindTransactionPage from "./components/FindTransactionPage/FindTransactionPage";
import AddTransactionPage from "./components/AddTransactionPage/AddTransactionPage";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import PageHeader from "./components/pageHeader/PageHeader";
import HomePage from "./components/HomePage/HomePage";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import {Provider} from "react-redux";
import store from './store/store'

function App() {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <PageHeader/>
                <Switch>
                    <Route path="/add">
                        <AddTransactionPage/>
                    </Route>
                    <Route path={["/find/:orderId", "/find"]}>
                        <FindTransactionPage/>
                    </Route>
                    <Route exact path="/">
                        <HomePage/>
                    </Route>
                    <Route>
                        <PageNotFound/>
                    </Route>

                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
