import { listingColors } from '../listing/colors';
import styled from 'styled-components';

export const OuterListingFormWrapper = styled.div`
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