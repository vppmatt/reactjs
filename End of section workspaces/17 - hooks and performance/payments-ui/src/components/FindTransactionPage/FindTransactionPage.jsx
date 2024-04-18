import Search from "./Search/Search"
import Transactions from "./Transactions/Transactions";
import {useState} from "react";
import {useNavigate} from 'react-router-dom';

const FindTransactionPage = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const applySearchTerm = (searchTerm) => {
        setSearchTerm(searchTerm);
        navigate(`/find/${searchTerm}`);
    }

    return (
        <div>
                <Search setSearchTerm={applySearchTerm} />
                <Transactions searchTerm={searchTerm} />
        </div>
    );
}

export default FindTransactionPage;
