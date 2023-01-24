import { LISTING_TYPES } from '../../listing/listing.const';
import { css } from 'styled-components';

export const listingColors = css`
  &.${LISTING_TYPES.room} {
    background-color: ${props => props.theme.colors.cornsilk};
  }
  &.${LISTING_TYPES.house} {
    background-color: ${props => props.theme.colors.creamGreen};
  }
  &.${LISTING_TYPES.apartment} {
    background-color: ${props => props.theme.colors.pastelGreen};
  }
  &.${LISTING_TYPES.townhouse} {
    background-color: ${props => props.theme.colors.blanchedAlmond};
  }
`;