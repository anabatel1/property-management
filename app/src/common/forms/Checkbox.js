import { StyledErrorMessage, hasErrorMessages, isRequired } from './Fields';
import { ErrorMessage } from '@hookform/error-message';
import { ReactHookFormPropTypes } from './ReactHookFormPropTypes';
import { forwardRef } from 'react';

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

Checkbox.displayName = 'Checkbox';
Checkbox.propTypes = ReactHookFormPropTypes;