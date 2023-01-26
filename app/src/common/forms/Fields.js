import { ErrorMessage } from '@hookform/error-message';
import { PropTypes } from 'prop-types';
import { forwardRef } from 'react';
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

export const CheckboxHook = forwardRef(function({
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

CheckboxHook.propTypes = ReactHookFormPropTypes;
CheckboxHook.displayName = 'Checkbox';

export const SelectHook = forwardRef(function({
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
SelectHook.propTypes = {
  ...ReactHookFormPropTypes,
  type: PropTypes.string
};
SelectHook.displayName = 'Select';

export const StyledSelect = styled.select`
  color: ${props => props.theme.colors.successBright};
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