import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const languages = {
  en: { nativeName: 'English' },
  dk: { nativeName: 'Dansk' }
};

const LanguageSelect = styled.select`
  width: 40%;

  @media ${props => props.theme.device.md} {
    width: 20%;
  }
`;

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return(
    <LanguageSelect
      label="language"
      defaultValue={i18n.resolvedLanguage}
      onChange={handleLanguageChange}
    >
      {Object.keys(languages).map((language) => (
        <option
          value={language}
          key={language}
        >
          {languages[language].nativeName}
        </option>
      ))}
    </LanguageSelect>
  );
};

LanguageSelector.propTypes = {
  username: PropTypes.string
};

export default LanguageSelector;