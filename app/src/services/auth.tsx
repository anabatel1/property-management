export const token = () => {
  const parsedToken = JSON.parse(window.localStorage.getItem('loggedInUser'))?.token;

  return `Bearer ${parsedToken}`;
};

export default token;