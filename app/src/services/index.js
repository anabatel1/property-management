import axios from 'axios';
import listingService from './listing';
import loginService from './login';
import tenantService from './tenant';

const getValidAddress = async (address) => {
  const { data } = await axios.get(`${process.env.REACT_APP_ADDRESS_API_URL}/datavask/adresser?betegnelse=${address}`);
  return data;
};

const getAddressLocation = async (addressId) => {
  const {
    data: {
      geometry: {
        coordinates
      }
    }
  } = await axios.get(`${process.env.REACT_APP_ADDRESS_API_URL}/adgangsadresser/${addressId}?format=geojson`);

  return coordinates;
};

const services = {
  login: loginService.login,
  getValidAddress,
  getAddressLocation,
  getAllUserListings: listingService.getAllUserListings,
  getOneUserListing: listingService.getOneUserListing,
  createNewListing: listingService.createNewListing,
  updateUserListing: listingService.updateUserListing,
  deleteUserListing: listingService.deleteUserListing,
  createNewTenant: tenantService.createNewTenant,
};

export default services;