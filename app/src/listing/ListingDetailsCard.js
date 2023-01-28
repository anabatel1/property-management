import ListingDetailsAddress from './ListingDetailsAddress';
import ListingDetailsMap from './ListingDetailsMap';
import { PropTypes } from 'prop-types';
import TenantForm from '../tenantForm';
import { listingColors } from '../common/listing/colors';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const ListingDetailsWrapper = styled.div`
  padding: 1rem;
  border-radius: 10px;

  ${listingColors}

  .mt-1 {
    margin-top: 1rem;
  }

  @media ${props => props.theme.device.md} {
    padding: 5rem;
  }
`;

const ListingDetailsTitle = styled.h2`
  color: ${props => props.theme.colors.error};
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media ${props => props.theme.device.md} {
    flex-direction: row;
  }

  & > * {
    flex: 1;
    min-height: 10rem;
  }
`;

const ListingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin-bottom: 0;
  }
`;

const ListingDetailsCard = ({ listing, handleDeleteButton }) => {
  const { t } = useTranslation();

  return (
    <ListingDetailsWrapper className={listing.type}>
      <ListingHeader>
        <ListingDetailsTitle>{listing.title}</ListingDetailsTitle>
        <button onClick={handleDeleteButton}>{t('listingDetails.delete')}</button>
      </ListingHeader>
      <FlexWrapper>
        <ListingDetailsAddress listing={listing} />
        <ListingDetailsMap addressId={listing?.addressId} />
      </FlexWrapper>
      <TenantForm listingId={listing?.id} />
    </ListingDetailsWrapper>
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

ListingDetailsCard.propTypes = {
  listing: PropTypes.shape(ListingPropTypes),
  confirmDelete: PropTypes.func,
  handleDeleteButton: PropTypes.func
};

export default ListingDetailsCard;