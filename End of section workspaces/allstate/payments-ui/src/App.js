import './App.css';
import PageHeader from "./components/PageHeader/PageHeader";
import FindTransacitonPage from "./components/FindTransactionPage/FindTransactionPage";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import HomePage from "./components/HomePage/HomePage";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import {Provider} from 'react-redux';
import store from './store/store';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <PageHeader/>

                <Switch>

                    <Route path={["/find/:orderId", "/find"]}>
                        <FindTransacitonPage/>
                    </Route>

                    <Route path="/add" exact={true}>
                        <AddTransaction/>
                    </Route>

                    <Route path="/" exact={true}>
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
