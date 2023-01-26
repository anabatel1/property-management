import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { InputStyle } from './inputs';
import { PropTypes } from 'prop-types';
import Quicksand from '../assets/Quicksand-Bold.ttf';
import colors from './colors';
import { devices } from './breakpoints';

// Returns a StyledComponent that does not accept children.
// Place it at the top of your React tree and the global styles will be injected when the component is "rendered".
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${props => props.theme.colors.superPastelGreen};
    @font-face {
        font-family: 'Quicksand';
        src: url(${Quicksand});
    }
    font-family: 'Quicksand', sans-serif;
  }

  label {
    margin-top: 1rem;
    margin-bottom: 0.25rem;
  }

  label.checkbox {
    font-weight: normal;
  }

  button[type="submit"] {
    margin-top: 1rem;
  }
  
  body,
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${props => props.theme.colors.lightYellow};
    color: ${props => props.theme.colors.superPastelGreen};
  }

  footer {
    position: sticky;
    top: 100%;
  }

  ${InputStyle(colors)}
`;

const theme = {
  colors: {
    success: colors.pastelGreen,
    successDark: colors.darkPastelGreen,
    successBright: colors.brightastelGreen,
    loading: colors.cornsilk,
    error: colors.superTanCrayola,
    errorBright: colors.red,
    linkColor: colors.darkPastelGreen,

    lightYellow: colors.lightYellow,
    blanchedAlmond: colors.blanchedAlmond,
    cornsilk: colors.cornsilk,
    tanCrayola: colors.tanCrayola,
    creamGreen: colors.creamGreen,
    pastelGreen: colors.pastelGreen,
    darkPastelGreen: colors.darkPastelGreen,
    superPastelGreen: colors.superPastelGreen,
    brightPastelGreen: colors.brightPastelGreen,
    darkerTanCrayola: colors.darkerTanCrayola,
  },
  fonts: ['sans-serif', 'Quicksand'],
  device: devices,
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle></GlobalStyle>
    {children}
  </ThemeProvider>
);

Theme.propTypes = {
  children: PropTypes.node
};

export default Theme;