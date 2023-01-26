import styled from 'styled-components';

export const ContentWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex: 1;
  flex-direction: column;

  @media ${props => props.theme.device.sm} {
    padding: 0 10px;
    width: 100%;
  }
  
  @media ${props => props.theme.device.md} {
    padding: 0;
    width: 90%;
  }

  @media ${props => props.theme.device.lg} {
    width: 80%;
  }

  @media ${props => props.theme.device.xl} {
    width: 70%;
  }

  @media ${props => props.theme.device['2xl']} {
    width: 60%;
  }
`;