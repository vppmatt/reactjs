import PropTypes from 'prop-types';

const Song = (props) => {

   console.log("Song is running with properties ", props);

   const voteNow = () => {
      props.recordVote();
   }


   return (<li>{props.song.title} by {props.song.artist} has {props.song.votes} votes. <button onClick={voteNow}>Vote for this song</button>
   </li>);
}

Song.propTypes = {
   song: PropTypes.shape({
      title: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired
   }).isRequired,
   recordVote: PropTypes.func.isRequired
};

export default Song;


