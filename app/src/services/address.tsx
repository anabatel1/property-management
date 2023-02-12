import axios from 'axios';

export const baseUrlAddress = process.env.REACT_APP_ADDRESS_API_URL;

const getValidAddress = async (address) => {
  const { data } = await axios.get(`${baseUrlAddress}/datavask/adresser?betegnelse=${address}`);
  return data;
};

const getAddressLocation = async (addressId) => {
  const {
    data: {
      geometry: {
        coordinates
      }
    }
  } = await axios.get(`${baseUrlAddress}/adgangsadresser/${addressId}?format=geojson`);

  return coordinates;
};

const addressService = {
  getValidAddress,
  getAddressLocation
};

export default addressService;