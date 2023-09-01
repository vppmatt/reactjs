import {getCountries} from "../data/DataFunctions";
import {useState, useTransition} from "react";
import Credits from "./Credits";

const AboutPage = () => {

    const [showCredits, setShowCredits] = useState(false);

    const [isPending, startTransition] = useTransition();

    const handleClick = () => startTransition( () => {
        setShowCredits(!showCredits);
    });

    return (
        <div>
            <h1>About Page</h1>
            <p>This is the payments app</p>
            <button onClick={handleClick}>{showCredits ? "hide" : "show"} credits</button>
            {showCredits && <Credits />}
            {isPending && <p>Loading...</p>}
        </div>
    );
}

export default AboutPage;
