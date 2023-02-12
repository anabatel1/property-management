export const handleLogout = ({ dispatch, setUser, redirect }) => {
  redirect('/', { replace: true });
  window.localStorage.setItem('loggedInUser', JSON.stringify({}));
  dispatch(setUser(''));
};

export const handleExpiredToken = ({ dispatch, setUser, redirect, t, toast }) => {
  // Remove user data and redirect to homepage
  handleLogout({ dispatch, setUser, redirect });
  toast(t('login.tokenExpired'));
};

export const isExpiredToken = (error) => error.response.status === 401 &&
    ['invalid token', 'token expired'].includes(error.response.data.error);