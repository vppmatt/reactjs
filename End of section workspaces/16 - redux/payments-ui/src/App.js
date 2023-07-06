import './App.css';

import FindTransactionPage from "./components/FindTransactionPage/FindTransactionPage";
import AddTransactionPage from "./components/AddTransactionPage/AddTransactionPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
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
            <Routes>
                <Route path="/add" element={<AddTransactionPage />} />
                <Route path="/find/:orderId" element={<FindTransactionPage/>} />
                <Route path="/find" element={<FindTransactionPage/>} />
                <Route path = "/" element={<HomePage />} />
                <Route element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
        </Provider>
    );
}

export default App;
