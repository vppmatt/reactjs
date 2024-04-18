import PropTypes from 'prop-types';

const TransactionTableRow = (props) => {
    return (
        <tr key={props.id}>
            <td>{props.id}</td><td>{props.orderId}</td><td>{props.date}</td><td>{props.country}</td><td>{props.currency}</td><td>{props.amount}</td>
        </tr>
    );
};

TransactionTableRow.propTypes = {
    id: PropTypes.string.isRequired,
    orderId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
};

export default TransactionTableRow;
