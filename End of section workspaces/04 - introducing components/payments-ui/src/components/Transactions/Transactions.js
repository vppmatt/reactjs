import './Transactions.css';
import TransactionTableRow from "./TransactionTableRow";

const Transactions = () => {

    return (
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
                        <TransactionTableRow id="1" country="USA" currency="USD" date="2023-09-12" amount="199" />
                        <TransactionTableRow id="2" country="FRA" currency="EUR" date="2023-09-12" amount="160.33" />
                        <TransactionTableRow id="3" country="USA" currency="USD" date="2023-09-12" amount="200" />
                        </tbody>
                    </table>
                </div>
          
    )
        ;
}

export default Transactions
