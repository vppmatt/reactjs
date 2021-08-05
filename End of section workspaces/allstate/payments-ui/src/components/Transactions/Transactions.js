import './Transactions.css';
import {useState, useEffect} from 'react';
import {getAllPaymentsForCountry,getCountries, getAllPaymentsForOrderId} from '../../Data/DataFunctions';
import TransactionTableRow from "./TransactionTableRow";
import { useHistory, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'

const Transactions = (props) => {

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);

    const [countryOptions, setCountryOptions] = useState([]);
    const [uniqueCountries, setUniqueCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const countriesInRedux = useSelector( state => state.countries );
    const lastFetchInRedux = useSelector (state => state.lastFetch);

    const reduxDispatch = useDispatch();

    const location= useLocation();

    const loadCountries = () =>  {

        const doWeNeedToRefreshCountries = () => {
            if(countriesInRedux.length === 0) return true;
            const now = new Date();
            const diff = now.getTime() - lastFetchInRedux.getTime();
            return diff > 60000; //1 minutes
        }

        const processCountries = (allCountries) => {
            setUniqueCountries(allCountries);
            setCountryOptions(allCountries.map(c => <option key={c} value={c}>{c}</option>));
            const country = new URLSearchParams(location.search).get("country");
            if (country != null) {
                setSelectedCountry(country);
            }
        }

        if (doWeNeedToRefreshCountries()) {
            console.log("getting data from rest");
            getCountries()
                .then(response => {
                    const allCountries = response.data.country;
                    processCountries(allCountries);
                    reduxDispatch({type : "receive-new-countries", value : allCountries });

                })
                .catch(error => {
                    console.log("something went wrong", error);
                });
        }
        else {
            console.log("getting data from redux");
            processCountries(countriesInRedux);
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

    const loadTransactionForSelectedOrder = () => {
        getAllPaymentsForOrderId(props.searchTerm)
            .then(response => {
                setLoading(false);
                setPayments(response.data);
            })
            .catch(error => {
                console.log("something went wrong", error);
            });

    }

    useEffect(() => {
        loadCountries();
    }, []);

    useEffect( () => {
        console.log("in use effect")
        if (props.searchTerm.length > 0) {
            setPayments([]);
            setLoading(true);
            loadTransactionForSelectedOrder();
        }
        else {
            loadTransactionsForSelectedCountry();
        }
    }, [selectedCountry, props.searchTerm]);

    const history = useHistory();

    const changeCountry = (e) => {
        const option = e.target.options.selectedIndex - 1;
        setLoading(true);
        setSelectedCountry(uniqueCountries[option]);
        history.push(`/find?country=${uniqueCountries[option]}`);
    }

    const countrySelector = <select id="countrySelector" onChange={changeCountry} defaultValue="xxx">
        <option key="xxx" value="xxx" disabled={true} >--select--</option>
        {countryOptions}
    </select>;

    return (
        <div>
            {countryOptions.length === 0 && <p className="loadingMessage">The data is loading please wait...</p>}

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
                        <th>Date</th>
                        <th>Country</th>
                        <th>Currency</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {payments.map(payment =>  TransactionTableRow(payment)) }
                    </tbody>
                </table>
            </div>
            }
        </div>
    )
        ;
}

export default Transactions
