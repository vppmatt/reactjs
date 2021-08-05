import './AddTransaction.css';
import {useReducer, useState} from 'react';
import {addNewTransaction} from "../../Data/DataFunctions";

const AddTransaction =()=> {

    const [message, setMessage] = useState("");

    const initialState = {
        orderId : "",
        date : new Date().toISOString().slice(0, 10), // yyyy-mm-dd
        amount: "0",
        country : "",
        currency : "",
        taxCode : "",
        taxRate : "",
        type : ""
    }

    const newTransactionReducer = (state, data) => {  //data = {field : "orderId", value : "1234"}
        return {...state, [data.field] : data.value  };
    };

    const [newTransaction, dispatch] = useReducer( newTransactionReducer , initialState );

    const handleChange = (event) => {
        dispatch({ field : event.target.id , value : event.target.value});
    }

    const {orderId, date, amount, country, currency, taxCode, taxRate, type} = newTransaction;

    const handleSubmit = (event) => {
        event.preventDefault();
        addNewTransaction(newTransaction)
            .then(
                result => {
                    if(result.status === 200) {
                        setMessage("Transaction was saved with id " + result.data.id);
                    } else {
                        setMessage("Something went wrong, status was " + result.status);
                    }
                }

            )
            .catch( error => setMessage("Something went wrong " + error));
    }

return (
    <form onSubmit={handleSubmit} className="addTransactionsForm">
        <h2>New transaction</h2>
        <label htmlFor="orderId">Order Id</label>
        <input type="text" id="orderId" onChange={handleChange} value={orderId}   />
        <br/>
        <label htmlFor="date">Date</label>
        <input type="date" id="date" onChange={handleChange} value={date} />
        <br/>
        <label htmlFor="country">Country</label>
        <input type="text"  id="country" onChange={handleChange} value={country}/>
        <br/>
        <label htmlFor="currency">Currency</label>
        <input type="text"  id="currency" onChange={handleChange} value={currency} />
        <br/>
        <label htmlFor="amount">Amount</label>
        <input type="text"  id="amount" onChange={handleChange} value={amount}/>
        <br/>
        <label htmlFor="taxCode">Tax Code</label>
        <input type="text"  id="taxCode" onChange={handleChange} value={taxCode}/>
        <br/>
        <label htmlFor="amount">Tax Rate</label>
        <input type="text"  id="taxRate" onChange={handleChange} value={taxRate}/>
        <br/>
        <label htmlFor="type">Type</label>
        <input type="text"  id="type" onChange={handleChange} value={type}/>
        <br/>
        <button type="submit">Save</button>
        <div className="addTransactionMessage">{message}</div>
    </form>

);

};

export default AddTransaction