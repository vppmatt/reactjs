import Song from "./Song";
import {useState} from 'react';

const SongList = (props) => {

    //VERSION 1
    // const songsForRendering = [];
    //
    // for (const [index, song] of songs.entries()) {
    //     songsForRendering.push(<Song key={index} title={song.title} artist={song.artist} />);
    // }

    //VERSION 3
    // return(<div>
    //     {songs.map( (song, index) => <Song key={index}
    //                                        title={song.title}artist={song.artist} />)}
    // </div>);

    //VERSION 2

    const [songs, setSongs] = useState([{ title: "Hard day's night", artist: "The Beetles", votes: 0},
        {title: "If you're over me", artist: "Years and years", votes: 0},
        {title: "Bohemian Rhapsody", artist: "Queen", votes: 0},
        {title: "Elvira", artist: "The Statler Brothers", votes: 0}
    ]);

    const [visible, setVisible] = useState(false);

    const toggleVisiblity = () => {
        setVisible(!visible)
    };

    const [topSong, setTopSong] = useState("not yet known");

    const addVote = (songId) => {

        const updatedSongs = songs.map( (song, index) => {
            if (index === songId) {
                return {...song, votes: song.votes + 1};
            }
            else {
                return song;
            }
        })
        setSongs (updatedSongs);

        const songWithHighestVotes = updatedSongs.reduce(function(prev, current) {
            return (prev.votes >= current.votes) ? prev : current
        })

        setTopSong(songWithHighestVotes.title);
    };

    return (
        <div>
            <button onClick={() => setVisible(!visible)}> {visible ? "hide songs" : "display songs"}</button>

            {visible &&

                songs.map((song, index) => {
                    return (<Song song={song} key={index} songId={index} votingFunction={addVote}
                />);
            })


            }

            <p>The song with the highest number of votes is {topSong}</p>

        </div>);

}

export default SongList;