import Song from './Song';
import {useState} from "react";

const SongList = () => {

    let [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible);
    }

    return (
        <div>
            <h2>Your favourite songs are:</h2>
            <button onClick={toggleVisibility}> {visible ? 'hide' : 'show'} songs</button>
            <ul style= {{display : visible ? 'block' : 'none'}}>
                <Song title="Last thing on my mind" artist="Steps"/>
                <Song title="If you're over me" artist="Years and years"/>
            </ul>
        </div>
    );
};

export default SongList
