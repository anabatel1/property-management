import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const FooterWrapper = styled.footer`
  background-color: ${props => props.theme.colors.creamGreen};
  padding: 1.5rem 0;
  margin-top: 1rem;
  text-align: center;
`;

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterWrapper>
      <div>
        <h5>{t('propertyManagement')}</h5>
      </div>
    </FooterWrapper>
  );
};

export default Footer;