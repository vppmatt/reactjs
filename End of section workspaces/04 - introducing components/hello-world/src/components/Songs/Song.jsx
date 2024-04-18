import PropTypes from 'prop-types';

const Song = (props) => {
   return (<li>{props.title} by {props.artist}</li>);
}

Song.propTypes = {
   title: PropTypes.string.isRequired,
   artist: PropTypes.string.isRequired
};


export default Song;
