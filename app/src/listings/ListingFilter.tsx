import { Checkbox } from 'primereact/checkbox';
import { LISTING_TYPES } from '../listing/listing.const';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const CheckboxWrapper = styled.div`
  display: flex;
  flex: row;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;

  label {
    margin-top: 0;
    font-weight: normal;
  }
`;

const SelectorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  padding: 1.5rem 0;
`;

const ListingFilter = ({ filter, setFilter }) => {
  const { t } = useTranslation();

  const onFilterChange = (e) => {
    let selectedFilters = [...filter];

    if (e.checked) {
      selectedFilters.push(e.value);
    }
    else {
      selectedFilters.splice(selectedFilters.indexOf(e.value), 1);
    }

    setFilter(selectedFilters);
  };

  return (
    <SelectorWrapper>
      <h4>{t('filterByType')}</h4>
      {Object.keys(LISTING_TYPES).map((type) => (
        <CheckboxWrapper key={type}>
          <Checkbox inputId={type} value={type} onChange={onFilterChange} checked={filter.includes(type)} />
          <label htmlFor={type}>
            {t(`type.${type}`)}
          </label>
        </CheckboxWrapper>
      ))}
    </SelectorWrapper>
  );
};

ListingFilter.propTypes = {
  filter: PropTypes.array,
  setFilter: PropTypes.func
};

export default ListingFilter;