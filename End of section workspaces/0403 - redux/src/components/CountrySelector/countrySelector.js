import {getCountries} from "../../data/DataFunctions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

const CountrySelector = (props) => {


    const countriesInRedux = useSelector(state => state.countries);
    const lastFetchInRedux = useSelector(state => state.lastFetch);

    const reduxDispatch = useDispatch();

    const [uniqueCountries, setUniqueCountries] = useState([]);
    const [countryOptions, setCountryOptions] = useState([]);

    const loadCountries = () => {

        const doWeNeedToRefreshCountries = () => {
            console.log('length', countriesInRedux.length);
            if (countriesInRedux.length === 0) return true;

            const now = new Date();
            const diff = now.getTime() - lastFetchInRedux.getTime();
            console.log('diff', diff);
            return diff > 60000;
        }


        if (doWeNeedToRefreshCountries()) {
            console.log('getting countries via rest');
            getCountries()
                .then(response => {
                    const allCountries = response.data.country;
                    setUniqueCountries(allCountries);
                    setCountryOptions(allCountries.map(c => <option key={c} value={c}>{c}</option>));
                    reduxDispatch({type: 'replace-countries', value: allCountries});
                })
                .catch(error => {
                    console.log("something went wrong", error);
                });
        } else {
            console.log('getting countries from redux');
            setUniqueCountries(countriesInRedux);
            setCountryOptions(countriesInRedux.map(c => <option key={c} value={c}>{c}</option>));

        }

    }

    useEffect(() => {
        loadCountries();
    }, []);

    const handleChange = (e) => {
        const option = e.target.options.selectedIndex - 1;
        props.changeCountry(uniqueCountries[option]);
    }

    const selector =
        <div>
            <label htmlFor="country">{props.label}</label>
            <select id="countrySelector" onChange={handleChange} defaultValue="xxx">
                <option key="xxx" value="xxx" disabled={true}>--select--</option>
                {countryOptions}
            </select>
        </div>;

    return (<div>
        {countryOptions.length === 0 && <p className="loadingMessage">The data is loading please wait...</p>}
        {countryOptions.length > 0 && selector}
    </div>);
}

export default CountrySelector;
