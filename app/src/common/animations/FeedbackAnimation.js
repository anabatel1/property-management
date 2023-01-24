import Animation from './Animation';
import { PropTypes } from 'prop-types';
import errorAnimation from './assets/error.json';
import loadingAnimation from './assets/dots.json';
import styled from 'styled-components';
import successAnimation from './assets/success.json';

const LoadingTitle = styled.div`
  font-size: 1rem;
  text-align: center;
  color: ${props => props.theme.colors[props.$feedbackType]};
  width: ${props => props.$animationWidth || 'auto'};
  padding: 0.5rem 0;
`;

const animationSources = {
  loading: {
    file: loadingAnimation,
    loop: true,
  },
  success: {
    file:successAnimation,
    loop: false,
  },
  error: {
    file: errorAnimation,
    loop: false,
  }
};

const FeedbackAnimation = ({ feedbackType = '', feedbackText = '', animationHeight = '2rem', animationWidth = '100%', }) => {
  let animationSource = animationSources[feedbackType];

  if (!animationSource) {
    return;
  }

  return (
    <>
      <Animation
        animationFile={animationSource.file}
        loopAnimation={animationSource.loop}
        height={animationHeight}
        width={animationWidth}
      />
      {feedbackText && <LoadingTitle $feedbackType={feedbackType} $animationWidth={animationWidth}>{feedbackText}</LoadingTitle>}
    </>
  );
};

FeedbackAnimation.propTypes = {
  animationHeight: PropTypes.string,
  animationWidth: PropTypes.string,
  feedbackText: PropTypes.string,
  feedbackType: PropTypes.oneOf(['loading', 'error', 'success'])
};

export default FeedbackAnimation;