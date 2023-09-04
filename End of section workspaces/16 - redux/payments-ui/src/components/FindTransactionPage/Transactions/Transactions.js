import './Transactions.css';
import {useState, useEffect} from 'react';
import {getAllPaymentsForCountry, getAllPaymentsForOrderId, getCountries} from '../../../data/DataFunctions';
import TransactionTableRow from "./TransactionTableRow";
import { useParams, useSearchParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {updateCountries} from "../../../store/store";

const Transactions = (props) => {

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);

    const [countryOptions, setCountryOptions] = useState([]);
    const [uniqueCountries, setUniqueCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const [selectedOrder, setSelectedOrder] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();

    // const loadCountries = () =>  {
    //     getCountries()
    //         .then(response => {
    //             const allCountries = response.data;
    //             setUniqueCountries(allCountries);
    //             setCountryOptions(allCountries.map(c => <option key={c} value={c}>{c}</option>));
    //         })
    //         .catch(error => {
    //             console.log("something went wrong", error);
    //         });
    // }

    const reduxCountries = useSelector(state => state.countries.countries);
    const dispatch = useDispatch();
    const loadCountries = () => {
        setLoading(reduxCountries.loading);
        if (reduxCountries.data.length > 0) {
            console.log("data obtained from redux store");
            setUniqueCountries(reduxCountries.data);
            setCountryOptions(reduxCountries.data.map(c => <option key={c} value={c}>{c}</option>));
        }
        else if (!reduxCountries.loading) {
            console.log("no data in redux - requesting it now");
            dispatch(updateCountries());
        }
        else {
            console.log("redux is already getting the data - do nothing right now");
        }
    }

    const loadTransactionsForSelectedCountry = () => {
        getAllPaymentsForCountry(selectedCountry)
            .then(response => {
                setLoading(false);
                setPayments(response.data);
            })
            .catch(error => {
                console.log("something went wrong", error);
            });
    };

    const params = useParams();
    const desiredOrder = params.orderId != null ? params.orderId : props.searchTerm;
    if (desiredOrder !== selectedOrder) {
        setSelectedOrder(desiredOrder);
    }

    const urlCountry = searchParams.get("country");
    if (urlCountry !== selectedCountry) {
        setLoading(true);
        setSelectedCountry(urlCountry);
    }

    const loadTransactionsForSelectedOrder = () => {
        setCountryOptions([]);
        setPayments([]);

         getAllPaymentsForOrderId(selectedOrder)
            .then(response => {
                setLoading(false);
                setPayments(response.data);
            })
            .catch(error => {
                console.log("something went wrong", error);
            });
    };

    if(loading && selectedOrder === "") {
        loadTransactionsForSelectedCountry();
    }

    useEffect(() => {

        if (selectedOrder > 0 ) {
            setPayments([]);
            setLoading(true);
            loadTransactionsForSelectedOrder();
        }else {
            setPayments([]);
            loadCountries();
        }
    }, [selectedOrder, reduxCountries]);

    const changeCountry = (e) => {
        const option = e.target.options.selectedIndex - 1;
        setLoading(true);
        setSelectedCountry(uniqueCountries[option]);
        setSearchParams({country: uniqueCountries[option]});
    }

    const countrySelector = <select id="countrySelector" onChange={changeCountry} defaultValue="xxx">
        <option key="xxx" value="xxx" disabled={true} >--select--</option>
        {countryOptions}
    </select>;

    return (
        <div>
            {countryOptions.length === 0 && selectedOrder === "" && <p className="loadingMessage">The data is loading please wait...</p>}

            {countryOptions.length > 0 && <div className="transactionsCountrySelector">
                Select country: {countrySelector}
                    </div>
            }

            {loading && <p className="loadingMessage">The data is loading please wait...</p>}

            {!loading && payments.length > 0 &&
                <div>

                    <table className="transactionsTable">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Order Id</th>
                            <th>Date</th>
                            <th>Country</th>
                            <th>Currency</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {payments.map(payment => TransactionTableRow(payment))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
        ;
}

export default Transactions
