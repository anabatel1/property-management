import { PropTypes } from 'prop-types';
import { StyledLink } from  '../navigation/StyledLink';
import StyledNavLink from '../navigation';
import { handleLogout } from '../login/hooks';
import { redirect } from 'react-router-dom';
import { setUser } from '../reducers/userReducer';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const UsernameComponent = styled.h4`
  max-width: 100%;

  @media ${props => props.theme.device.md} {
    max-width: 10%;
  }
`;

const LoggedInLinks = ({ username }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  return (
    <>
      <UsernameComponent>{t('welcome', { username })}</UsernameComponent>
      <StyledNavLink to="/">
        {t('portfolio')}
      </StyledNavLink>
      <StyledNavLink to="/add">
        {t('addListing')}
      </StyledNavLink>
      <StyledLink onClick={() => handleLogout({ dispatch, redirect, setUser })}>{t('logOut')}</StyledLink>
    </>
  );
};

LoggedInLinks.propTypes = {
  username: PropTypes.string
};

export default LoggedInLinks;