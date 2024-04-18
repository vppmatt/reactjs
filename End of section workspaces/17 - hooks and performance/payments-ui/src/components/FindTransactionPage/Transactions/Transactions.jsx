import './Transactions.css';
import {useState, useEffect} from 'react';
import {getAllPaymentsForCountry, getAllPaymentsForOrderId} from '../../../data/DataFunctions';
import TransactionTableRow from "./TransactionTableRow";
import { useParams} from 'react-router-dom';
import CountryDropdown from "../../CountryDropdown";

const Transactions = (props) => {

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedCountry, setSelectedCountry] = useState(null);

    const [selectedOrder, setSelectedOrder] = useState("");

    const loadTransactionsForSelectedCountry = (country) => {
        getAllPaymentsForCountry(country || selectedCountry)
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

    const loadTransactionsForSelectedOrder = () => {

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
        }
    }, [selectedOrder]);

    const changeCountry = (country) => {
        console.log("loading for " + country);
        loadTransactionsForSelectedCountry(country);
        setSelectedCountry(country);
    }


    return (
        <div>
            <div className="transactionsCountrySelector">
            <CountryDropdown selectedOrder={selectedOrder} setCountry={changeCountry} />
            </div>

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
