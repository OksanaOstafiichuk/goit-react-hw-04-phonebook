import { useState } from 'react';
import { FilterInput } from '../Filter/Filter.styled';
import { Button } from '../ContacItem/ContactItem.styled';
import { Form, FormInput } from './ContactForm.styled';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const hendelSaveContact = evt => {
    const { name, value } = evt.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const hendelSubmit = evt => {
    evt.preventDefault();

    onSubmit(name, number);
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={hendelSubmit}>
      <FormInput>
        <span>Name</span>
        <FilterInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={hendelSaveContact}
        />
      </FormInput>
      <FormInput>
        <span>Number</span>
        <FilterInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={hendelSaveContact}
        />
      </FormInput>
      <Button type="submit">Add contact</Button>
    </Form>
  );
};
