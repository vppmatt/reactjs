import PropTypes from "prop-types";
import {memo, useEffect, useMemo, useState} from "react";
import {getCountries} from "../data/DataFunctions";
import {useSearchParams} from "react-router-dom";
import {useLocalStorage} from "../useLocalStorage";

const CountryDropdown = (props) => {

    const [countryOptions, setCountryOptions] = useState([]);
    const [uniqueCountries, setUniqueCountries] = useLocalStorage("countries", true, []);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCountry, setSelectedCountry] = useState("xxx");

    const [sortedCountries, setSortedCountries] = useState([]);

    const changeCountry = (e) => {
        const option = e.target.options.selectedIndex - 1;
        setSelectedCountry(sortedCountries[option]);
        setSearchParams({country: sortedCountries[option]});
        props.setCountry(sortedCountries[option]);
    }
    const loadCountries = () =>  {
        if (uniqueCountries.length === 0) {
            console.log("getting countries from server");
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
        else {
            console.log("using countries from local storage");
            setCountryOptions(uniqueCountries.map(c => <option key={c} value={c}>{c}</option>));
            const urlCountry = searchParams.get("country");
            if (urlCountry != null && urlCountry !== selectedCountry) {
                setSelectedCountry(urlCountry);
                props.setCountry(urlCountry);
            }
        }
    }

    useEffect(() => {
        loadCountries();
    }, []);


    const cleanUpCountries = () => {
        const sortedAndFiltered = uniqueCountries
            .filter(a => a != null && a !== "")
            .map(a => a.toLowerCase())
            .sort();
        const finalCountryList = [... new Set(sortedAndFiltered)];
        setSortedCountries(finalCountryList);
        return finalCountryList.map(c => <option key={c} value={c}>{c}</option>);
    }

    const sortedCountryOptions = useMemo( () => cleanUpCountries(), [uniqueCountries]);

    const countrySelector = <select id="countrySelector" onChange={changeCountry} defaultValue={selectedCountry}>
        <option key="xxx" value="xxx" disabled={true} >--select--</option>
        {sortedCountryOptions}
    </select>;

    return <>
        {countryOptions.length === 0 && props.selectedOrder === "" && <p className="loadingMessage">The data is loading please wait...</p>}
        {countryOptions.length > 0 && <div className={props.topPadding ? "transactionsCountrySelector" : ""}  >
            Select country: {countrySelector}</div>}
        </>

}

CountryDropdown.propTypes = {
    setCountry: PropTypes.func.isRequired,
    selectedOrder: PropTypes.string.isRequired,
}

export default memo(CountryDropdown);


