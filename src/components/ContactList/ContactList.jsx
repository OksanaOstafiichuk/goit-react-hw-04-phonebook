import { ContactItem } from 'components/ContacItem/ContactItem';
import PropTypes from 'prop-types';
import { List } from './ContactList.styled';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <List>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} onDelete={onDelete} />
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ),
};
