
import axios from 'axios';
import { token } from './auth';

export const baseUrlListings = process.env.REACT_APP_LISTING_URL;

const getAllUserListings = async () => {
  const config = {
    headers: { Authorization: token() },
  };

  const data = await axios.get(`${baseUrlListings}`, config);
  return data?.data;
};

const fetchOneListing = (id) => `${baseUrlListings}/${id}`;

const getOneUserListing = async (id) => {
  const config = {
    headers: { Authorization: token() },
  };

  const data = await axios.get(fetchOneListing(id), config);
  return data?.data;
};

const getOneUserListingWithTenant = async (id) => {
  const config = {
    headers: { Authorization: token() },
  };

  const data = await axios.get(`${fetchOneListing(id)}?details[]=tenant`, config);
  return data?.data;
};

const createNewListing = async (listing) => {
  const config = {
    headers: { Authorization: token() },
  };

  const data = await axios.post(baseUrlListings, listing, config);
  return data?.data;
};

const updateUserListing = async (id, listing) => {
  const config = {
    headers: { Authorization: token() },
  };

  const data = await axios.put(`${baseUrlListings}/${id}`, listing, config);
  return data?.data;
};

const deleteUserListing = async (id) => {
  const config = {
    headers: { Authorization: token() },
  };

  const data = await axios.delete(`${baseUrlListings}/${id}`, config);
  return data?.data;
};

const listingService = {
  getAllUserListings,
  getOneUserListing,
  createNewListing,
  updateUserListing,
  deleteUserListing,
  getOneUserListingWithTenant,
};

export default listingService;