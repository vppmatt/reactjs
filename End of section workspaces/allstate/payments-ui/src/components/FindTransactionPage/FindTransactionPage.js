import {useState, useEffect} from 'react';
import Search from "../Search/Search";
import Transactions from "../Transactions/Transactions";
import {useHistory, useParams} from 'react-router-dom';

const FindTransactionPage = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const history = useHistory();

    const applySearchTerm = (orderId) => {
        history.push(`/find/${orderId}`);
        setSearchTerm(orderId);
    }

    const params = useParams();

    useEffect(() => {
        if (params.orderId != null ) {
            setSearchTerm(params.orderId);
        }
        else {
            setSearchTerm("");
        }
    }, [params.orderId]);

    return (
        <>
            <Search setSearchTerm={applySearchTerm}/>
            <Transactions searchTerm={searchTerm}/>
        </>
    );

};

export default FindTransactionPage;