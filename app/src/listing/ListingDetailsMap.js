import Map from '../map';
import { PropTypes } from 'prop-types';
import { useFetchAPIAddressLocation } from '../listingForm/hooks';
import { useTranslation } from 'react-i18next';

const ZOOM_HOUSE_SOME_NEIGHBORHOOD = 18;

const zoom = ZOOM_HOUSE_SOME_NEIGHBORHOOD;

const ListingDetailsMap = ({ addressId }) => {
  const { t } = useTranslation();

  const { isError, isLoading, addressLocation = [] } = useFetchAPIAddressLocation(addressId);

  if (isLoading) {
    return t('listingDetails.map.coordinatesLoading');
  }

  if (isError || addressLocation.length !== 2) {
    return t('listingDetails.map.coordinatesFail');
  }

  const center = {
    lat: addressLocation[1],
    lng: addressLocation[0]
  };

  return (
    <Map
      center={center}
      zoom={zoom}
      markers={[center]}
      style={{ height: '12rem', width: '100%' }}
    />
  );
};

ListingDetailsMap.propTypes = {
  addressId: PropTypes.string
};

export default ListingDetailsMap;