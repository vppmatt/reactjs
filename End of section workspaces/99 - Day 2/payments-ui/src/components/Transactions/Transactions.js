import './Transactions.css';
import {useState} from 'react';
import {getAllPayments} from './../../data/DataFunctions';
import TransactionTableRow from "./TransactionTableRow";

const Transactions = () => {

    const payments = getAllPayments();
    const allPaymentCountries = payments.map(payment => payment.country);
    const uniqueCountries = allPaymentCountries.filter((country, index) => allPaymentCountries.indexOf(country) === index);
    const countryOptions = uniqueCountries.map(c => <option key={c} value={c}>{c}</option>);

    const [selectedCountry, setSelectedCountry] = useState(uniqueCountries[0])

    const changeCountry = (e) => {
        const option = e.target.options.selectedIndex;
        setSelectedCountry(uniqueCountries[option]);
    }

    const countrySelector = <select id="countrySelector" onChange={changeCountry}>
        {countryOptions}
    </select>;

    return (
        <div>
            <div className="transactionsCountrySelector">
                Select country: {countrySelector}
            </div>
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
    );
}

export default Transactions
