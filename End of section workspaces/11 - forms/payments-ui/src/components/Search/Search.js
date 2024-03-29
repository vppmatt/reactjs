import './Search.css';
import {useState} from "react";

const Search = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [valid, setValid] = useState(false);
    const [touched, setTouched] = useState(false);

    const doSearch = (event) => {
        event.preventDefault();
        console.log(searchTerm);
    }

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        setTouched(true);
        setValid (event.target.value.trim().length > 0);
    }

    return (
        <div className="searchBox">
            <form onSubmit={doSearch}>
            <label htmlFor="orderId">Order Id:</label>
            <input id="orderId" type="text" value={searchTerm} onChange={handleChange} className={touched && !valid ? 'searchBoxError' : ''} />
            <button type="submit" disabled={!valid} >Search</button>
            </form>
        </div>
    );
}

export default Search
