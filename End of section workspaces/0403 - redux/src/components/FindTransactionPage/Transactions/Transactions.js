import './Transactions.css';
import {useState, useEffect} from 'react';
import {getAllPaymentsForCountry, getAllPaymentsForOrderId} from '../../../data/DataFunctions';
import TransactionTableRow from "./TransactionTableRow";
import {useHistory, useParams, useLocation} from 'react-router-dom';
import CountrySelector from "../../CountrySelector/countrySelector";

const Transactions = (props) => {

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedCountry, setSelectedCountry] = useState(null);

    const [selectedOrder, setSelectedOrder] = useState("");

    const history = useHistory();

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

    const urlCountry = new URLSearchParams(useLocation().search).get("country");
    if (urlCountry !== selectedCountry) {
        setLoading(true);
        setSelectedCountry(urlCountry);
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

    if (loading && selectedOrder === "") {
        loadTransactionsForSelectedCountry();
    }

    useEffect(() => {

        if (selectedOrder > 0) {
            setPayments([]);
            setLoading(true);
            loadTransactionsForSelectedOrder();
        } else {
            setPayments([]);
        }
    }, [selectedOrder]);

    const changeCountry = (country) => {
        setLoading(true);
        setSelectedCountry(country);
        history.push(`/find?country=${country}`);
    }

    return (
        <div>

            {selectedOrder === "" &&
            <div className="transactionsCountrySelector">
                <CountrySelector label="Select country:" changeCountry={changeCountry}/>
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
    );
}

export default Transactions
