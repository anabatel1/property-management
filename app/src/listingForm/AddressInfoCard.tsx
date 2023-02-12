import { PropTypes } from 'prop-types';
import { StyledLabel } from '../common/forms';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const StyledSection = styled.section`
  padding: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  background-color: ${props => props.theme.colors.creamGreen};
`;

const AddressInfo = ({
  id,
  adresseringsvejnavn,
  vejnavn,
  husnr,
  etage,
  dør,
  postnr,
  postnrnavn,
}) => {
  const { t } = useTranslation();

  return (
    <StyledSection key={id}>
      <StyledLabel>{t('adresseringsvejnavn')}:</StyledLabel>{adresseringsvejnavn}
      <StyledLabel>{t('vejnavn')}:</StyledLabel>{vejnavn}
      <StyledLabel>{t('husnr')}:</StyledLabel>{husnr}
      <StyledLabel>{t('etage')}:</StyledLabel>{etage || '--'}
      <StyledLabel>{t('dør')}:</StyledLabel>{dør || '--'}
      <StyledLabel>{t('postnr')}:</StyledLabel>{postnr}
      <StyledLabel>{t('postnrnavn')}:</StyledLabel>{postnrnavn}
    </StyledSection>
  );
};

AddressInfo.propTypes = {
  id: PropTypes.string,
  adresseringsvejnavn: PropTypes.string,
  vejnavn: PropTypes.string,
  husnr: PropTypes.string,
  etage: PropTypes.string,
  dør: PropTypes.string,
  postnr: PropTypes.string,
  postnrnavn: PropTypes.string,
};

export default AddressInfo;