const Song = (props) => {

   const voteNow = () => {
      props.recordVote(props.song.artist);
   }

   return (<li>{props.song.title} by {props.song.artist} has {props.song.votes} votes. <button onClick={voteNow}>Vote for this song</button>
   </li>);
}

export default Song
