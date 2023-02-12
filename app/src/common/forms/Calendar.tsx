import { Control, Controller, FieldValues } from 'react-hook-form';
import { FieldOptions, StyledErrorMessage, StyledLabel, hasErrorMessages, isRequired } from './Fields';
import { ErrorMessage } from '@hookform/error-message';
import { Calendar as PrimeReactCalendar } from 'primereact/calendar';
import { useEffect } from 'react';

interface CalendarOptions extends FieldOptions {
  register: Function;
  children: JSX.Element;
  control: Control<FieldValues>;
}

export const Calendar = ({
  label, name, id, schema, errors, control, initialValue, setValue, ...props
}: CalendarOptions) => {
  useEffect(() => {
    setValue(name, initialValue ? new Date(initialValue) : null);
  }, [initialValue, setValue, name]);

  return (
    <>
      <StyledLabel htmlFor={id || name}>{label} {isRequired(schema, name) && '*'}</StyledLabel>
      <Controller
        name={name}
        control={control}
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
