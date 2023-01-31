import { StyledErrorMessage, StyledInput, StyledLabel,
  hasErrorMessages, isRequired } from './Fields';
import { ErrorMessage } from '@hookform/error-message';
import { PropTypes } from 'prop-types';
import { ReactHookFormPropTypes } from './ReactHookFormPropTypes';
import { forwardRef } from 'react';

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