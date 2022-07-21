import { Component } from 'react';
import shortid from 'shortid';

import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { PhoneBook, Title, Contacts } from './App.styled';

const LOCALSTORAGE_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactList = localStorage.getItem(LOCALSTORAGE_KEY);
    const parsedContactList = JSON.parse(contactList);

    if (parsedContactList) {
      this.setState({ contacts: parsedContactList });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextState = this.state.contacts;

    if (prevState.contacts !== nextState) {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(nextState));
    }
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;

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
      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    }
  };

  deleteContact = idContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idContact),
    }));
  };

  filterContacts = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  addFilter = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const renderFilter = this.addFilter();

    return (
      <PhoneBook>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.addContact} />

        <Contacts>Contacts</Contacts>
        <Filter value={filter} onChange={this.filterContacts} />
        <ContactList contacts={renderFilter} onDelete={this.deleteContact} />
      </PhoneBook>
    );
  }
}
