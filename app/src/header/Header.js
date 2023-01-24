import { ContentWrapper } from '../common/ContentWrapper';
import LanguageSelector from './LanguageSelector';
import LoggedInLinks from './LoggedInLinks';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  background: ${props => props.theme.colors.success};
  margin-bottom: 1rem;

  
  ${ContentWrapper} {
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    @media (${props => props.theme.device.md}) {
      flex-direction: row;
    }
  }
`;

const Header = ({ username }) => {
  return(
    <HeaderWrapper>
      <ContentWrapper>
        {username && <LoggedInLinks username={username} />}
        <LanguageSelector />
      </ContentWrapper>
    </HeaderWrapper>
  );
};

Header.propTypes = {
  username: PropTypes.string
};

export default Header;