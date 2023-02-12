import services from '../services';
import { useQuery } from '@tanstack/react-query';

export const MIN_ADDRESS_LENGTH = 5;

export const useFetchAddress = (address) => {
  const { isLoading, isError, data: validatedAddress } = useQuery({
    queryKey: ['validateAddress', address],
    queryFn: () => services.getValidAddress(address),
    enabled: address.length >= MIN_ADDRESS_LENGTH
  });

  return {
    isLoading,
    isError,
    validatedAddress
  };
};

export const useFetchAPIAddressLocation = (addressId) => {
  const { isLoading, isError, data: addressLocation } = useQuery({
    queryKey: ['addressLocation', addressId],
    queryFn: () => services.getAddressLocation(addressId),
    enabled: addressId.length >= 0
  });

  return {
    isLoading,
    isError,
    addressLocation
  };
};