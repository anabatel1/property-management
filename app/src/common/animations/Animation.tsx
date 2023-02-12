import Lottie from 'lottie-react';

interface AnimationOptions {
  height?: string;
  width?: string;
  animationFile: object;
  loopAnimation?: boolean;
}

const Animation = ({ height = '2rem', width ='100%', animationFile, loopAnimation = true }: AnimationOptions) => {
  return (
    <Lottie animationData={animationFile} loop={loopAnimation} style={{ height, width }} />
  );
};

export default Animation;