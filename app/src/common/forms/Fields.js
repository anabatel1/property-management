import { forwardRef, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Calendar as PrimeReactCalendar } from 'primereact/calendar';
import { InputNumber as PrimeReactInputNumber } from 'primereact/inputnumber';
import { PropTypes } from 'prop-types';
import get from 'lodash.get';
import styled from 'styled-components';

const ReactHookFormPropTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  schema: PropTypes.object,
  errors: PropTypes.object,
  register: PropTypes.func,
  children: PropTypes.node,
};

const errorMessages = (errors, name) => get(errors, name);
const hasErrorMessages = (errors, name) => !!(errors && errorMessages(errors, name));

// Find from schema if the field is required
const isRequired = (schema, name) => schema?.fields?.[name]?.exclusiveTests?.required ?? false;

export const Input = forwardRef(function({
  label, name, id, type = 'text', schema, errors, register, ...props
}, ref) {
  // register is used with the spread operator because it's an object of functions
  return (
    <>
      <StyledLabel htmlFor={id || name}>{label} {isRequired(schema, name) && '*'}</StyledLabel>
      <StyledInput
        ref={ref}
        label={label}
        name={name}
        type={type}
        aria-invalid={hasErrorMessages(errors, name)}
        {...props}
        {...(register && register(name))}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <StyledErrorMessage>{message}</StyledErrorMessage>
        )}
      />
    </>
  );
});
Input.propTypes = {
  ...ReactHookFormPropTypes,
  type: PropTypes.string
};
// Used for debugging
Input.displayName = 'Input';

export const Checkbox = forwardRef(function({
  label, name, id, schema, errors, register, children, ...props
}, ref) {
  return (
    <>
      <label className="checkbox" htmlFor={id}>
        <input
          ref={ref}
          type="checkbox"
          label={label}
          id={id}
          name={name}
          aria-invalid={hasErrorMessages(errors, name)}
          {...props}
          {...(register && register(name))}
        />
        {isRequired(schema, name) && '*'}{children}
      </label>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <StyledErrorMessage>{message}</StyledErrorMessage>
        )}
      />
    </>
  );
});

Checkbox.propTypes = ReactHookFormPropTypes;
Checkbox.displayName = 'Checkbox';

export const Select = forwardRef(function({
  label, name, id, type = 'text', schema, errors, register, ...props
}, ref) {
  return (
    <>
      <StyledLabel htmlFor={id || name}>{label} {isRequired(schema, name) && '*'}</StyledLabel>
      <StyledSelect
        ref={ref}
        label={label}
        name={name}
        type={type}
        aria-invalid={hasErrorMessages(errors, name)}
        {...props}
        {...(register && register(name))}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <StyledErrorMessage>{message}</StyledErrorMessage>
        )}
      />
    </>
  );
});
Select.propTypes = {
  ...ReactHookFormPropTypes,
  type: PropTypes.string
};
Select.displayName = 'Select';

export const Calendar = ({
  label, name, id, schema, errors, control, initialValue, setValue, ...props
}) => {
  useEffect(() => {
    setValue(name, new Date(initialValue));
  }, [initialValue, setValue, name]);

  return (
    <>
      <StyledLabel htmlFor={id || name}>{label} {isRequired(schema, name) && '*'}</StyledLabel>
      <Controller
        name={name}
        control={control}
        label={label}
        render={({ field }) => (
          <PrimeReactCalendar
            id={field.name}
            value={field.value}
            dateFormat="dd.mm.yy."
            mask="01.01.2023."
            touchUI
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
Calendar.propTypes = {
  ...ReactHookFormPropTypes,
  type: PropTypes.string
};
Calendar.displayName = 'Calendar';

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

export const StyledSelect = styled.select`
  width: 100%;

  @media ${props => props.theme.device.md} {
    width: 45%;
  }
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.errorBright};
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
`;

export const StyledLabel = styled.label`
  margin-top: 1rem;
`;

export const StyledInput = styled.input`
  @media ${props => props.theme.device.sm} {
    width: 100%;
  }

  @media ${props => props.theme.device.md} {
    width: 45%;
  }

  &[aria-invalid=true] {
    &:focus {
      border-color: ${props => props.theme.colors.errorBright};
    }
  }
`;

export const StyledButton = styled.button`
  display: block;

  @media ${props => props.theme.device.sm} {
    width: 100%;
  }

  @media ${props => props.theme.device.md} {
    width: 45%;
  }
`;