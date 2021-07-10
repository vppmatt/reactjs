import './Transactions.css';
import {useState, useEffect} from 'react';
import {getAllPaymentsForCountry, getAllPaymentsForOrderId, getCountries} from '../../../data/DataFunctions';
import TransactionTableRow from "./TransactionTableRow";

const Transactions = (props) => {

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);

    const [countryOptions, setCountryOptions] = useState([]);
    const [uniqueCountries, setUniqueCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const loadCountries = () =>  {
        getCountries()
            .then(response => {
                const allCountries = response.data.country;
                setUniqueCountries(allCountries);
                setCountryOptions(allCountries.map(c => <option key={c} value={c}>{c}</option>));
            })
            .catch(error => {
                console.log("something went wrong", error);
            });
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

    const loadTransactionsForSelectedOrder = () => {
        setCountryOptions([]);
        setPayments([]);

         getAllPaymentsForOrderId(props.searchTerm)
            .then(response => {
                setLoading(false);
                setPayments(response.data);
            })
            .catch(error => {
                console.log("something went wrong", error);
            });
    };

    if(loading && props.searchTerm.length === 0) {
        loadTransactionsForSelectedCountry();
    }

    useEffect(() => {
        if (props.searchTerm.length > 0 ) {
            setPayments([]);
            setLoading(true);
            loadTransactionsForSelectedOrder();
        }else {
            setPayments([]);
            loadCountries();
        }
    }, [props.searchTerm]);

    const changeCountry = (e) => {
        const option = e.target.options.selectedIndex - 1;
        setLoading(true);
        setSelectedCountry(uniqueCountries[option]);
    }

    const countrySelector = <select id="countrySelector" onChange={changeCountry} defaultValue="xxx">
        <option key="xxx" value="xxx" disabled={true} >--select--</option>
        {countryOptions}
    </select>;

    return (
        <div>
            {countryOptions.length === 0 && props.searchTerm.length === 0 && <p className="loadingMessage">The data is loading please wait...</p>}

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
