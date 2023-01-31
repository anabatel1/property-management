import { StyledErrorMessage, StyledLabel, hasErrorMessages, isRequired
} from './Fields';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Calendar as PrimeReactCalendar } from 'primereact/calendar';
import { PropTypes } from 'prop-types';
import { ReactHookFormPropTypes } from './ReactHookFormPropTypes';
import { useEffect } from 'react';

export const Calendar = ({
  label, name, id, schema, errors, control, initialValue, setValue, ...props
}) => {
  useEffect(() => {
    setValue(name, initialValue ? new Date(initialValue) : null);
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
            touchUI
            showButtonBar
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
Calendar.displayName = 'Calendar';
Calendar.propTypes = {
  ...ReactHookFormPropTypes,
  type: PropTypes.string
};
