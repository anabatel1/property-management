import { LISTING_TYPES } from '../listing/listing.const';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { listingColors } from '../common/listing/colors';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const ListingCardLink = styled(Link)`
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  padding: 1.5rem;
  border-radius: 10px;
  color: ${props => props.theme.colors.linkColor};

  &:hover {
    opacity: 0.8;
  }
  
  :visited,
  :link {
    color: ${props => props.theme.colors.linkColor};
  }

  ${listingColors}
`;

const Detail = styled.div`
  font-size: 0.8rem;
`;

const Title = styled.h3`
  padding-bottom: 0.8rem;
`;

const ListingCard = ({ id, title, rooms, size, type }) => {
  const { t } = useTranslation();

  return (
    <ListingCardLink key={id}
      className={type}
      to={`/listing/${id}`}
    >
      <Title>
        {title}
      </Title>
      <div>
        <Detail>{t('listingType')}: {t(`type.${type}`)}</Detail>
        <Detail>{t('rooms')}: {rooms}</Detail>
        <Detail>{t('size')}: {size}m<sup>2</sup></Detail>
      </div>
    </ListingCardLink>
  );
};

ListingCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  rooms: PropTypes.number,
  size: PropTypes.number,
  type: PropTypes.oneOf(Object.keys(LISTING_TYPES))
};

export default ListingCard;