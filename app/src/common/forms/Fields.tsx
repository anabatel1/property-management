import { Calendar as FieldCalendar } from './Calendar';
import { Checkbox as FieldCheckbox } from './Checkbox';
import { Input as FieldInput } from './Input';
import { PriceInput as FieldPriceInput } from './PriceInput';
import { Select as FieldSelect } from './Select';
import get from 'lodash.get';
import styled from 'styled-components';

export const Input = FieldInput;
export const PriceInput = FieldPriceInput;
export const Checkbox = FieldCheckbox;
export const Calendar = FieldCalendar;
export const Select = FieldSelect;

export const errorMessages = (errors, name) => get(errors, name);
export const hasErrorMessages = (errors, name) => !!(errors && errorMessages(errors, name));

// Find from schema if the field is required
export const isRequired = (schema: Object, name: string) => schema?.fields?.[name]?.exclusiveTests?.required ?? false;

export const StyledErrorMessage = styled.div`
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
  &[aria-invalid=true] {
    &:focus {
      border-color: ${props => props.theme.colors.errorBright};
    }
  }
`;

export const StyledButton = styled.button`
  display: block;
`;

export interface FieldOptions {
  label: string;
  name: string;
  id: string;
  schema: string;
  errors: string[];
  initialValue: string;
  setValue: Function;
}