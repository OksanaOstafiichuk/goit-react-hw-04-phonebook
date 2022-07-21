import PropTypes from 'prop-types';
import { FilterInput } from './Filter.styled';

export const Filter = ({ value, onChange }) => {
  return (
    <label>
      <span>Find contacts by name</span>
      <FilterInput type="text" value={value} onChange={onChange} />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onchange: PropTypes.array,
};
