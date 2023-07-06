const Song = (props) => {

   console.log("Song is running with properties ", props);

   const voteNow = () => {
      props.recordVote();
   }

   return (<li>{props.song.title} by {props.song.artist} has {props.song.votes} votes. <button onClick={voteNow}>Vote for this song</button>
   </li>);
}

export default Song
