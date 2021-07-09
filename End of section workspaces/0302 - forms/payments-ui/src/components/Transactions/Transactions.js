import './Transactions.css';
import {useState, useEffect} from 'react';
import {getAllPaymentsForCountry,getCountries} from '../../data/DataFunctions';
import TransactionTableRow from "./TransactionTableRow";

const Transactions = () => {

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

    if(loading) loadTransactionsForSelectedCountry();

    useEffect(() => {
        loadCountries();
    }, []);

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
                        {payments.map(payment => payment.country === selectedCountry && TransactionTableRow(payment))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
        ;
}

export default Transactions
