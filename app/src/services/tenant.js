
import axios from 'axios';
import { token } from './auth';

export const baseUrlTenants = process.env.REACT_APP_TENANT_URL;

const getAllUserTenants = async () => {
  const config = {
    headers: { Authorization: token() },
  };

  const data = await axios.get(`${baseUrlTenants}`, config);
  return data?.data;
};

const getOneUserTenant = async (id) => {
  const config = {
    headers: { Authorization: token() },
  };

  const data = await axios.get(`${baseUrlTenants}/${id}`, config);
  return data?.data;
};

const createNewTenant = async (tenant) => {
  const config = {
    headers: { Authorization: token() },
  };

  const data = await axios.post(baseUrlTenants, tenant, config);
  return data?.data;
};

const updateUserTenant = async (listingId, tenant) => {
  const config = {
    headers: { Authorization: token() },
  };

  const data = await axios.put(`${baseUrlTenants}/${listingId}`, tenant, config);
  return data?.data;
};

const deleteUserTenant = async (listingId) => {
  const config = {
    headers: { Authorization: token() },
  };

  const data = await axios.delete(`${baseUrlTenants}/${listingId}`, config);
  return data?.data;
};

const listingService = {
  getAllUserTenants,
  getOneUserTenant,
  createNewTenant,
  updateUserTenant,
  deleteUserTenant,
};

export default listingService;