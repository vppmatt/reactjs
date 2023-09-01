import './AddTransaction.css';
import {memo, useCallback, useEffect, useId, useMemo, useReducer, useRef, useState} from "react";
import {addNewTransaction} from "../../data/DataFunctions";
import CountryDropdown from "../CountryDropdown";

const AddTransaction = () => {

    console.log("add transaction is rendering")

    const initialNewTransactionState = {orderId : "", date : new Date().toISOString().slice(0, 10), amount : "0",
        country : "USA", currency : "USD", taxCode : "0", taxRate : "0.21", type: "SALE"};

    const [message, setMessage] = useState("");

    const formReducer = (state, data) => {
        return {
            ...state,
            [data.field]: data.value
        };
    }

    const [newTransaction, dispatch] = useReducer(formReducer , initialNewTransactionState);


    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage("saving ");
        console.log(newTransaction);
        const response = addNewTransaction(newTransaction);
        response.then(
            result => {
                if (result.status === 200) {
                    setMessage("new transaction added");
                }
                else {
                    setMessage("something went wrong - error code was " + result.status );
                }
            }
        )
        .catch(error => console.log("something went wrong ", error));
    }

    const handleChange = (event) => {
        dispatch( {field : event.target.id, value : event.target.value});
    }

    const handleChangeCountry = useCallback( (country) => {
        dispatch( {field : "country", value : country});
    },[]);

    const {orderId, date,  amount , country, currency, taxCode, taxRate, type} = newTransaction;

    const idAmount = useId();

    return (
        <>
        <form className="addTransactionsForm" onSubmit={handleSubmit}>
            <h2>New transaction</h2>
            <label htmlFor="orderId">Order Id</label>
            <input type="text" id="orderId"  value={orderId} onChange={handleChange} />
            <br/>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" value={date} onChange={handleChange} />
            {
                //<br/>
                // <label htmlFor="country">Country</label>
            //<input type="text"  id="country" value={country} onChange={handleChange} />
            //<br/>
            }
            <CountryDropdown setCountry={handleChangeCountry} topPadding={false} />
            <label htmlFor="currency">Amount</label>
            <input type="text"  id="currency" value={currency} onChange={handleChange} />
            <br/>
            <label htmlFor={idAmount}>Amount</label>
            <input type="text"  id={idAmount} value={amount} onChange={handleChange} />
            <br/>
            <label htmlFor="taxCode">Tax Code</label>
            <input type="text"  id="taxCode" value={taxCode} onChange={handleChange} />
            <br/>
            <label htmlFor="amount">Tax Rate</label>
            <input type="text"  id="taxRate" value={taxRate} onChange={handleChange} />
            <br/>
            <label htmlFor="type">Type</label>
            <input type="text"  id="type" value={type} onChange={handleChange} />
            <br/>
            <button type="submit">Save</button>
            <div className="addTransactionMessage">{message}</div>
        </form>
        </>
    );
}

export default AddTransaction;
