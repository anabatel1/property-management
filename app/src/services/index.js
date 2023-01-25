import addressService from './address';
import listingService from './listing';
import loginService from './login';
import tenantService from './tenant';

const services = {
  login: loginService.login,
  getValidAddress: addressService.getValidAddress,
  getAddressLocation: addressService.getAddressLocation,
  getAllUserListings: listingService.getAllUserListings,
  getOneUserListing: listingService.getOneUserListing,
  createNewListing: listingService.createNewListing,
  updateUserListing: listingService.updateUserListing,
  deleteUserListing: listingService.deleteUserListing,
  createNewTenant: tenantService.createNewTenant,
  getOneUserListingWithTenant: listingService.getOneUserListingWithTenant,
};

export default services;