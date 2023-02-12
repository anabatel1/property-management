import ListingDetailsAddress from './ListingDetailsAddress';
import ListingDetailsMap from './ListingDetailsMap';
import { OuterListingFormWrapper } from '../common/forms/FormWrapper';
import { PropTypes } from 'prop-types';
import TenantForm from '../tenantForm';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

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
    <OuterListingFormWrapper className={listing.type}>
      <ListingHeader>
        <ListingDetailsTitle>{listing.title}</ListingDetailsTitle>
        <button onClick={handleDeleteButton}>{t('listingDetails.delete')}</button>
      </ListingHeader>
      <FlexWrapper>
        <ListingDetailsAddress listing={listing} />
        <ListingDetailsMap addressId={listing?.addressId} />
      </FlexWrapper>
      <TenantForm listingId={listing?.id} />
    </OuterListingFormWrapper>
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
  handleDeleteButton: PropTypes.func
};

export default ListingDetailsCard;