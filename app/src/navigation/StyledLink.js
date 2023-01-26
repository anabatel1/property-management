import { Link, NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

const LinkStyle = () => css`
  text-decoration: none;
  line-height: 1.5rem;
  transition: all 0.3s ease-in-out;
  border-bottom: 3px transparent solid;
  display: inline-block;
  font-weight: bold;

  &:visited,
  &:link {
    color: ${props => props.theme.colors.linkColor};
  }

  &.active {
    border-bottom-color: ${props => props.theme.colors.linkColor};
  }

  &:hover {
    color: ${props => props.theme.colors.darkerTanCrayola};
    border-bottom: 3px ${props => props.theme.colors.darkerTanCrayola} solid;
  }

  @media ${props => props.theme.device.md} {
    line-height: 3rem;
  }
`;

export const StyledNavLink = styled(NavLink)`
  ${LinkStyle}
`;

export const StyledLink = styled(Link) `
  ${LinkStyle};
`;