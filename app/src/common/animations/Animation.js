import Lottie from 'lottie-react';
import { PropTypes } from 'prop-types';

const Animation = ({ height = '2rem', width ='100%', animationFile, loopAnimation = true }) => {
  return (
    <Lottie animationData={animationFile} loop={loopAnimation} style={{ height, width }} />
  );
};

Animation.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  animationFile: PropTypes.object,
  loopAnimation: PropTypes.bool,
};

export default Animation;