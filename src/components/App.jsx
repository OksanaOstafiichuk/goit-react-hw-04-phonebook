import shortid from 'shortid';
import { useState, useEffect } from 'react';

import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { PhoneBook, Title, Contacts } from './App.styled';

const LOCALSTORAGE_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY)) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    const findName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (findName) {
      alert(`${name} is already in contacts.`);
      return;
    } else {
      setContacts(prevState => [...prevState, ...[contact]]);
    }
  };

  const filterContacts = evt => {
    setFilter(evt.currentTarget.value);
  };

  const addFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = idContact => {
    setContacts(prevState =>
      contacts.filter(contact => contact.id !== idContact)
    );
  };

  return (
    <PhoneBook>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContact} />

      <Contacts>Contacts</Contacts>
      <Filter value={filter} onChange={filterContacts} />
      <ContactList contacts={addFilter()} onDelete={deleteContact} />
    </PhoneBook>
  );
};
