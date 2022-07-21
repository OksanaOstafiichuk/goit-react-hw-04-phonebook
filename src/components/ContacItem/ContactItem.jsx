import PropTypes from 'prop-types';
import { ImUserCheck } from 'react-icons/im';
import { Item, Button } from './ContactItem.styled';

export const ContactItem = ({ contact, onDelete }) => {
  return (
    <Item>
      <ImUserCheck color="385898" /> - {contact.name}: {contact.number}
      <Button type="button" onClick={() => onDelete(contact.id)}>
        Delete
      </Button>
    </Item>
  );
};

ContactItem.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ),
  onDelete: PropTypes.func.isRequired,
};
