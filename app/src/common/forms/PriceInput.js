import { StyledErrorMessage, StyledLabel, hasErrorMessages, isRequired } from './Fields';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { InputNumber as PrimeReactInputNumber } from 'primereact/inputnumber';
import { PropTypes } from 'prop-types';
import { ReactHookFormPropTypes } from './ReactHookFormPropTypes';
import { useEffect } from 'react';

export const PriceInput = ({
  label, name, id, schema, errors, control, initialValue, setValue, ...props
}) => {
  useEffect(() => {
    setValue(name, initialValue);
  }, [initialValue, setValue, name]);

  return (
    <>
      <StyledLabel htmlFor={id || name}>{label} {isRequired(schema, name) && '*'}</StyledLabel>
      <Controller
        name={name}
        control={control}
        label={label}
        render={({ field }) => (
          <PrimeReactInputNumber
            id={field.name}
            value={field.value}
            mode="currency"
            currency="DKK"
            locale="dk-DK"
            aria-invalid={hasErrorMessages(errors, name)}
            onChange={(e) => field.onChange(e.value)}
            {...props}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <StyledErrorMessage>{message}</StyledErrorMessage>
        )}
      />
    </>
  );};
PriceInput.propTypes = {
  ...ReactHookFormPropTypes,
  type: PropTypes.string
};
PriceInput.displayName = 'PriceInput';