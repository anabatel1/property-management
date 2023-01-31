import { PropTypes } from 'prop-types';

export const ReactHookFormPropTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  schema: PropTypes.object,
  errors: PropTypes.object,
  register: PropTypes.func,
  children: PropTypes.node,
};