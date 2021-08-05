import './Search.css';
import {useState} from 'react';

const Search = (props) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [valid, setValid] = useState(false);
    const [touched, setTouched] = useState(false);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        setTouched(true);
        setValid( event.target.value.trim().length > 0 );
    }

    const doSearch = (event) => {
        event.preventDefault();
        if(valid) {
            props.setSearchTerm(searchTerm);
        }
    }

    const resetSearch = () => {
        setSearchTerm("");
        props.setSearchTerm("");
    }

    return (
        <div className="searchBox">
            <form onSubmit={doSearch}  >
                <label htmlFor="orderId">Order Id:</label>
                <input onChange={handleChange} value={searchTerm} id="orderId" type="text"
                className = { (!valid && touched) ? 'searchBoxError' : ''}
                />
                <button type="submit" disabled={!valid} >Search</button>
                <button onClick={resetSearch}  >Reset</button>
            </form>
        </div>
    );
}

export default Search
