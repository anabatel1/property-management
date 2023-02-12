import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';

const ListingDetailsAddress = ({ listing }) => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <div className='mt-1'>
          <div>{listing.rooms} {t('rooms')}</div>
          <div>{listing.size}m<sup>2</sup></div>
        </div>
        <h3>{t('addressDetails')}</h3>
        <div>{t('streetName')}: {listing?.addressDetails?.streetName || '--'}</div>
        <div>{t('houseNumber')}: {listing?.addressDetails?.houseNumber || '--'}</div>
        <div>{t('floor')}: {listing?.addressDetails?.floor || '--'}</div>
        <div>{t('door')}: {listing?.addressDetails?.door || '--'}</div>
        <div>{t('postalCode')}: {listing?.addressDetails?.postalCode || '--'}</div>
        <div>{t('postalCodeName')}: {listing?.addressDetails?.postalCodeName || '--'}</div>
      </div>
    </>
  );
};

const AddressDetailsPropTypes = {
  door: PropTypes.string,
  floor: PropTypes.string,
  houseNumber: PropTypes.string,
  postalCode: PropTypes.string,
  postalCodeName: PropTypes.string,
  streetName: PropTypes.string,
};

const ListingPropTypes = {
  addressDetails: PropTypes.shape(AddressDetailsPropTypes),
  addressId: PropTypes.string,
  rooms: PropTypes.number,
  size: PropTypes.number,
  title: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
};

ListingDetailsAddress.propTypes = {
  listing: PropTypes.shape(ListingPropTypes),
};

export default ListingDetailsAddress;