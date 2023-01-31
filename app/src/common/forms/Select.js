import { StyledErrorMessage, StyledLabel, hasErrorMessages, isRequired
} from './Fields';
import { ErrorMessage } from '@hookform/error-message';
import { PropTypes } from 'prop-types';
import { ReactHookFormPropTypes } from './ReactHookFormPropTypes';
import { forwardRef } from 'react';

export const Select = forwardRef(function({
  label, name, id, type = 'text', schema, errors, register, ...props
}, ref) {
  return (
    <>
      <StyledLabel htmlFor={id || name}>{label} {isRequired(schema, name) && '*'}</StyledLabel>
      <select
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