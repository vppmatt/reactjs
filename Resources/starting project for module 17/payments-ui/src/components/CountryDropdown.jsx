import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
import {getCountries} from "../data/DataFunctions";
import {useSearchParams} from "react-router-dom";

const CountryDropdown = (props) => {
    const [countryOptions, setCountryOptions] = useState([]);
    const [uniqueCountries, setUniqueCountries] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCountry, setSelectedCountry] = useState("xxx");

    const changeCountry = (e) => {
        const option = e.target.options.selectedIndex - 1;
        setSelectedCountry(uniqueCountries[option]);
        setSearchParams({country: uniqueCountries[option]});
        props.setCountry(uniqueCountries[option]);
    }
    const loadCountries = () =>  {
        getCountries()
            .then(response => {
                const allCountries = response.data;
                setUniqueCountries(allCountries);
                setCountryOptions(allCountries.map(c => <option key={c} value={c}>{c}</option>));
                const urlCountry = searchParams.get("country");
                if (urlCountry != null && urlCountry !== selectedCountry) {
                    setSelectedCountry(urlCountry);
                    props.setCountry(urlCountry);
                }
            })
            .catch(error => {
                console.log("something went wrong", error);
            });

    }

    useEffect(() => {
        loadCountries();
    }, []);

    CountryDropdown.propTypes = {
        setCountry: PropTypes.func.isRequired,
        selectedOrder: PropTypes.func.isRequired,
    }

    const countrySelector = <select id="countrySelector" onChange={changeCountry} defaultValue={selectedCountry}>
        <option key="xxx" value="xxx" disabled={true} >--select--</option>
        {countryOptions}
    </select>;

    return <>
        {countryOptions.length === 0 && props.selectedOrder === "" && <p className="loadingMessage">The data is loading please wait...</p>}
        {countryOptions.length > 0 && <div className="transactionsCountrySelector">
            Select country: {countrySelector}</div>}
        </>

}

export default CountryDropdown;
