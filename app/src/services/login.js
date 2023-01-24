import axios from 'axios';
const baseUrl = process.env.REACT_APP_LOGIN_URL;

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const loginMethods = {
  login
};

export default loginMethods;