import Animation from './Animation';
import React from 'react';
import errorAnimation from './assets/error.json';
import loadingAnimation from './assets/dots.json';
import styled from 'styled-components';
import successAnimation from './assets/success.json';

const LoadingTitle = styled.div<{ $feedbackType: FeedbackAnimationOptions['feedbackType'], $animationWidth: string }>`
  font-size: 1rem;
  text-align: center;
  color: ${props => props.theme.colors[props.$feedbackType]};
  width: ${props => props.$animationWidth};
  padding: 0.5rem 0;
`;

LoadingTitle.defaultProps = {
  $feedbackType: 'loading',
  $animationWidth: '100%',
};

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

interface FeedbackAnimationOptions {
  animationHeight?: string;
  animationWidth?: string;
  feedbackText?: string;
  feedbackType: 'loading' | 'error' | 'success';
}

const FeedbackAnimation:React.FC<FeedbackAnimationOptions> = ({
  feedbackType = 'loading',
  feedbackText = '',
  animationHeight = '2rem',
  animationWidth = '100%'
}) => {
  let animationSource = animationSources[feedbackType];

  if (!animationSource) {
    return <></>;
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

export default FeedbackAnimation;