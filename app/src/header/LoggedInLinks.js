import { PropTypes } from 'prop-types';
import { StyledLink } from  '../navigation/StyledLink';
import StyledNavLink from '../navigation';
import { handleLogout } from '../login/hooks';
import { redirect } from 'react-router-dom';
import { setUser } from '../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const LoggedInLinks = ({ username }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  return (
    <>
      <h3>{t('welcome', { username })}</h3>
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