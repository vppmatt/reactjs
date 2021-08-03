const Song = (props) => {

    const voteForSong = () => {
        props.votingFunction(props.songId);
    }


    return(<li>{props.song.title} by {props.song.artist}. {props.song.votes} votes.
        <button onClick={voteForSong}>Vote for this song</button>
    </li>);
};

export default Song;