import FeedbackAnimation from '../common/animations';
import ListingCard from './ListingCard';
import ListingFilter from './ListingFilter';
import StyledNavLink from '../navigation';
import listingService from '../services/listing';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex-direction: row;
`;

const Listings = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState([]);

  const {
    isLoading,
    isError,
    data: listings,
  } = useQuery(['listings'], listingService.getAllUserListings);

  if (isLoading) {
    return (
      <FeedbackAnimation feedbackType="loading" />
    );
  }

  if (isError) {
    return (
      <FeedbackAnimation feedbackType="error" />
    );
  }

  const hasListings = listings && listings.length > 0;

  return (
    <div>
      <h2>{t('portfolio')}</h2>
      <ListingFilter filter={filter} setFilter={setFilter} />

      <Wrapper>
        {hasListings ?
          listings.filter(({ type }) => !filter.length || filter.includes(type)).map((details) =>
            <ListingCard key={details.id} {...details} />
          )
          :
          <>
            {t('noListingFound')}
            <StyledNavLink to="add">{t('addListing')}</StyledNavLink>
          </>}
      </Wrapper>
    </div>
  );};

export default Listings;